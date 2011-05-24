class ProductImport < ActiveRecord::Base
  belongs_to :seller

  has_attached_file :csv
  validates_attachment_presence :csv
  validates_attachment_content_type :csv, :content_type => ['text/csv','text/comma-separated-values','text/csv','application/csv','application/excel','application/vnd.ms-excel','application/vnd.msexcel','text/anytext','text/plain']

  include AASM

  aasm_column :status # defaults to aasm_state

  aasm_initial_state :pending

  aasm_state :pending #, :after_enter => :import_products
  aasm_state :completed
  aasm_state :processing
  aasm_state :failed
 
  # load a delayed job to handle this task
  def import
    lines = parse_csv_file(self.csv.path)
    lines.shift #comment this line out if your CSV file doesn't contain a header row

    if lines.sizes > 0
      lines.each do |line|
        @product_draft = ProductDraft.new
        @product_draft.title        = line[0]
        @product_draft.description  = line[1]
        @product_draft.seller_price = line[2]
        @product_draft.quantity     = line[3]
        @product_draft.image_urls   = line[4] #urls of images
        @product_draft.category_id  = line[5] #give users a list of category ids
        @product_draft.tags         = line[6] #comma separatad tags
        @product_draft.condition    = line[7] #new, used or refurbished
        @product_draft.shipping     = line[8] #comma separate country code with price

        if @product_draft.save
          true
        else
          errors.add_to_base(:base, "something crazy happened")
        end
      end
    end

  end

  private

    def parse_csv_file(path_to_csv)
      lines = []
      require 'fastercsv'
      FasterCSV.foreach(path_to_csv) do |row|
        lines << row
      end
      lines
    end

end

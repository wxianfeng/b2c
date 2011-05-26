class ProductImportJob
  attr_accessor :errors
  @queue = :product_import

  def self.perform(product_import_id)
    ProductImport.transaction do
      import = ProductImport.find(product_import_id)
      import.processing! #aasm 
      lines  = parse_csv_file(import.csv.path)
      lines.shift #comment this line out if your CSV file doesn't contain a header row
      @errors = []
      if lines.sizes > 0
        lines.each_with_index do |line, i|
          product              = ProductDraft.new
          product.title        = line[0]
          product.description  = line[1]
          product.seller_price = line[2]
          product.quantity     = line[3]
          product.image_urls   = line[4] #urls of images
          product.category_id  = line[5] #give users a list of category ids
          product.tags         = line[6] #comma separatad tags
          product.condition    = line[7] #new, used or refurbished
          product.shipping     = line[8] #comma separate country code with price

          if product.save
            true
          else
            errors << "Item at line #{i} was not uploaded because #{product.errors.full_messages.map{|t|t}.join(', ')}"
            next
          end
        end
        return errors
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

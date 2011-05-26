class ProductImport < ActiveRecord::Base
  belongs_to :seller

  has_attached_file :csv
  validates_attachment_presence :csv
  validates_attachment_content_type :csv, :content_type => ['text/csv','text/comma-separated-values','text/csv','application/csv','application/excel','application/vnd.ms-excel','application/vnd.msexcel','text/anytext','text/plain']
    
  before_validation :validate_csv_file, :on => :create
    
  MAXIMUM_IMPORT = 1
  
  include AASM

  aasm_column :status # defaults to aasm_state

  aasm_initial_state :pending

  aasm_state :pending, :after_enter => :import
  aasm_state :completed
  aasm_state :processing
  aasm_state :failed

  def import
    Resque.enqueue(::ProductImportJob, self.id)
  end
  
  def self.pending
   scoped(:conditions => {:status => "pending"})  
  end
  
  def validate_csv_file
    csv_text = self.csv.queued_for_write[:original].read.strip
    csv_text.gsub(/\n?\r\n?/,"\n")
    if csv_text.blank? then raise ArgumentError, "CSV file cannot be blank." end
    if csv_text =~/^,+$/ then raise ArgumentError, "CSV file has a line of commas without any data." end
    if csv_text =~/\t/ then raise ArgumentError, "CSV file has a tab in it. Verify you are uploading comma separated values, not tab separated values." end
    
    require 'faster_csv'
    rows = FasterCSV.parse(csv_text) #.shifted

    if rows.nil? then raise ArgumentError, "CSV file has no rows." end
    if rows.size.eql?(0) then raise ArgumentError, "CSV file has a header row but no data rows." end
  end
  
end

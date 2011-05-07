##
# TODO:digest
class Upload::Asset < ActiveRecord::Base
  set_table_name "uploads"
  belongs_to :assetable , :polymorphic => true
  belongs_to :product
  
  def url(*args)
    data.url(*args)
  end
  alias :public_filename :url
  
  def filename
    data_file_name
  end
  
  def content_type
    data_content_type
  end
  
  def size
    data_file_size
  end
  
  def path
    data.path
  end
  
  def styles
    data.styles
  end
  
end
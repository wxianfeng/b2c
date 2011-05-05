class Product < ActiveRecord::Base  
  
  belongs_to :category
  has_many :product_tags
  has_many :tags , :through=>:product_tags
  
  validates :category_id , :presence => true
  validates :name , :presence => true
  validates :description , :presence => true
  
end
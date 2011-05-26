class Product < ActiveRecord::Base  
  belongs_to :seller, :class_name => "User"
  belongs_to :category
  has_many :product_tags
  has_many :tags ,  :through=> :product_tags
  has_many :colors, :through => :product_colors
  has_many :product_sizes
  
  has_many :pictures , :as=>:assetable , :class_name => "Upload::Asset"  
  
  validates :name , :presence => { :message=>"name cant be blank" }
  validates :description , :presence => { :message=>"description cant be blank" }
  
  
  PRODUCT_STATUS = ['ON SALE', 'OFF SALE']
end
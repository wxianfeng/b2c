class Product < ActiveRecord::Base
  belongs_to :seller, :class_name => "User"
  belongs_to :category
  has_many :product_tags
  has_many :tags ,  :through=> :product_tags
  has_many :product_colors
  has_many :colors, :through => :product_colors
  has_many :product_sizes
  has_many :shipping_prices, :dependent => :destroy
  has_many :pictures , :as=>:assetable , :class_name => "Upload::Asset"


  validates :name ,         :presence => { :message =>"Item title can't be blank" }
  validates :description ,  :presence => { :message =>"Item description can't be blank" }
  validates :seller_price , :presence => { :message =>"Item price can't be blank" }
  validates :category_id,   :presence => { :message => "Item category can't be blank"}
  validates :quantity,       :presence => { :message => "Item Quantiy can't be blank"}
  validates :seller_price,  :numericality => {:message => "Item Price is not valid"}
  validates :shipping_price_ids, :presence => {:message => "You must set shipping price for atleast one country."}
  

  PRODUCT_STATUS    = ['ON SALE', 'OFF SALE']
  PRODUCT_CONDITION = ['New', 'Used', 'Refurbished']

  accepts_nested_attributes_for :shipping_prices, :reject_if => proc { |attributes| attributes['price'].blank? }
  
  attr_accessor :parent_category_id
 
end

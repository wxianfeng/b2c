class ProductSize < ActiveRecord::Base
  belongs_to :product
  
  US_WOMEN_SHOE_SIZES = []
  
  EU_WOMEN_SHOE_SIZES = []
  
  US_MEN_SHOE_SIZES   = []
  
  EU_MEN_SHOE_SIZES   = []
end

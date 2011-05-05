class Offer < ActiveRecord::Base
  belongs_to  :item
  
  validates :title, :price, :presence => true
end

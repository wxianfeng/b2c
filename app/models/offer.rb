class Offer < ActiveRecord::Base
  belongs_to  :item
  
  validates :item_id, :price, :presence => true
end

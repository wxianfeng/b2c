class Offer < ActiveRecord::Base
  belongs_to  :item
  has_many    :orders
  
  validates :item_id, :price, :presence => true
end

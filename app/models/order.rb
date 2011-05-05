class Order < ActiveRecord::Base
  belongs_to  :item
  belongs_to  :offer
  
  validates   :title, :price, :presence => true
end

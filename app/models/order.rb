class Order < ActiveRecord::Base
  has_many  :items
  has_many  :offers
  
  validates   :title, :price, :presence => true
end

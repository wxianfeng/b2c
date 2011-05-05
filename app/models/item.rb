class Item < ActiveRecord::Base
  has_many  :offers
  has_many  :itemquestions
  
  validates  :title, :presence => true
end

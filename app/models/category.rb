class Category < ActiveRecord::Base
  has_many :products
  
  def children
    Category.where(:category_id=>self.id)
  end
  
end

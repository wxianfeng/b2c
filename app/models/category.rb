class Category < ActiveRecord::Base
  has_many :products
  has_many :childrens , :foreign_key => "parent_id" , :class_name=>"Category"
  belongs_to :parent , :foreign_key => "parent_id" ,  :class_name=>"Category"
  
  validates :name , :presence => true  
  validates :show_order , :format => { :with => /\d+/ , :message => "must number" } ,:uniqueness => true
  
  def parents
    ps = []
    s = self.parent
    while s.present?
      ps << s
      s = s.parent
    end    
    ps
  end
  
end

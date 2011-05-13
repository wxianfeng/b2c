class Category < ActiveRecord::Base
  has_many :products
  has_many :childrens , :foreign_key => "parent_id" , :class_name=>"Category" , :dependent=>:destroy
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
  
  def self.first_category
    Category.where("parent_id IS NULL")
  end
  
  ##
  # {:a=>[:a1,:a2],:b=>[:b1,:b2]}
  def self.all_categories
    acs = {}
    Category.where("public = 1").find_each do |c|
      acs.update(c.name => c.childrens.map(&:name))
    end
    acs
  end
  
end

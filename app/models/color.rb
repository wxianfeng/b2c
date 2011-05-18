class Color < ActiveRecord::Base
  
  validates :name , :presence=>{:message=>"color name cant blank"},:uniqueness=>{:message=>"color name must unique"}
  
end

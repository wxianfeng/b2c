class Color < ActiveRecord::Base
  
  validates :name , :presence=>{:message=>"color name cant blank"},:uniqueness=>{:message=>"color name must unique"}
  validates :value , :presence=>{:message=>"color value cant blank"},:uniqueness=>{:message=>"color value must unique"}
  
end

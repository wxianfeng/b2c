class Color < ActiveRecord::Base
  
  validates :name , :presence=>{:message=>"color name cant blank"},:uniqueness=>{:message=>"color name must unique"}
  validates :value , :presence=>{:message=>"color value cant blank"},:uniqueness=>{:message=>"color value must unique"},:format=>{:with=>/^[0-9a-fA-F]{6}$/,:message=>"color value format error"}
  
  # display color name and value
  def display_name
    "#{name}:<span class='crayon' style='background-color:##{self.value};'>&nbsp;</span>".html_safe
  end
end

class Itemquestion < ActiveRecord::Base
  belongs_to  :item
  
  validates   :question_type, :question, :presence => true
end

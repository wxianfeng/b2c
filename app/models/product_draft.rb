class ProductDraft < ActiveRecord::Base
  belongs_to :seller, :class_name => "User"
end
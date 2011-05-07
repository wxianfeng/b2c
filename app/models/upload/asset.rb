##
# TODO:digest
class Upload::Asset < ActiveRecord::Base
  set_table_name "uploads"
  belongs_to :assetable , :polymorphic => true
  belongs_to :product
end
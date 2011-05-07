##
# TODO:digest
class Upload::Asset < ActiveRecord::Base
  set_table_name "assets"
  belongs_to :assetable , :polymorphic => true
end
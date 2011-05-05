class Upload::Asset < ActiveRecord::Base
  belongs_to :assetable , :polymorphic => true
end
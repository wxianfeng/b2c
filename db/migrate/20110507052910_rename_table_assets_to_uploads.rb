class RenameTableAssetsToUploads < ActiveRecord::Migration
  def self.up
    rename_table :assets , :uploads
  end

  def self.down
    rename_table :uploads , :assets
  end
end

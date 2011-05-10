class RenameCategoriesCategoryIdToParentId < ActiveRecord::Migration
  def self.up
    rename_column :categories , :category_id , :parent_id
  end

  def self.down
    rename_column :categories , :parent_id , :category_id
  end
end

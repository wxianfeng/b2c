class AddAncestryToCategories < ActiveRecord::Migration
  def self.up
    add_column :categories, :ancestry, :string
    add_column :categories, :names_depth_cache, :string
    add_column :categories, :path, :string
    add_column :categories, :position, :integer
    add_index  :categories, :ancestry
    add_index  :categories, :names_depth_cache
    # remove_column :categories, :parent_id
  end

  def self.down
    remove_column :categories, :position
    remove_column :categories, :path
    remove_column :categories, :names_depth_cache
    remove_column :categories, :ancestry
  end
end
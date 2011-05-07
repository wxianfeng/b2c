class AddColumnProductIdToAssets < ActiveRecord::Migration
  def self.up
    add_column :assets , :product_id , :integer , :limit=>11
    add_column :assets , :user_id , :integer , :limit=>11

    add_index :assets , :product_id
    add_index :assets , :user_id
  end

  def self.down
    remove_column :assets , :product_id
    remove_column :assets , :user_id
  end
end

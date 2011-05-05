class CreateTableProductTags < ActiveRecord::Migration
  def self.up
    create_table :product_tags do |t|
      t.integer :product_id , :limit=>11 
      t.integer :tag_id , :limit=>11
      t.timestamps
    end
    add_index :product_tags , :product_id
    add_index :product_tags , :tag_id
  end

  def self.down
    drop_table :product_tags
    remove_index :product_tags , :product_id
    remove_index :product_tags , :tag_id
  end
end

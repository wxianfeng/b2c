class CreateTableProducts < ActiveRecord::Migration
  def self.up
    create_table :products do |t|
      t.integer :seller_id , :limit=>11
      t.integer :category_id , :limit=>11
      t.string :name
      t.text :description
      t.timestamps
    end
    add_index :products , :seller_id
    add_index :products , :category_id
  end

  def self.down
    drop_table :products
    remove_index :products , :seller_id
    remove_index :products , :category_id
  end
end

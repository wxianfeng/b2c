class CreateTableProductShippings < ActiveRecord::Migration
  def self.up  # (products) n <---> n (shippings)   middle table
    create_table :product_shippings do |t|
      t.integer :product_id , :limit=>11
      t.integer :shipping_id , :limit=>11
      
      t.timestamps
    end
    add_index :product_shippings , [:product_id,:shipping_id]
  end

  def self.down
  end
end

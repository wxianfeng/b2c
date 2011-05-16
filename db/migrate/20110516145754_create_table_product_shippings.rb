class CreateTableProductShippings < ActiveRecord::Migration
  def self.up  # (products) n <---> n (shippings)   middle table
    create_table :product_shippings do |t|
      t.integer :product_id , :limit=>11
      t.integer :shipping_id , :limit=>11
      
      t.timestamps
    end
  end

  def self.down
  end
end

class CreateTablePrices < ActiveRecord::Migration
  def self.up
    create_table :prices do |t|
      t.integer :product_id , :limit=>11
      t.integer :quantity_min , :limit=>11
      t.integer :quantity_max , :limit=>11
      t.decimal :seller_price , :precision => 10 , :scale=>2
      t.decimal :website_price , :precision => 10 , :scale=>2
      t.timestamps
    end
    add_index :prices , :product_id
  end

  def self.down
    drop_table :prices
    remove_index :prices , :product_id
  end
end

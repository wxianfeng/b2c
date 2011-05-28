class CreateShippingPrices < ActiveRecord::Migration
  def self.up
    create_table :shipping_prices do |t|
      t.references :product
      t.string     :country_code
      t.decimal    :price, :precision => 10 , :scale => 2
      t.timestamps
    end
    add_index :shipping_prices, :product_id
  end

  def self.down
    drop_table :shipping_prices
  end
end

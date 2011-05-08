class CreateOrders < ActiveRecord::Migration
  def self.up
    create_table :orders do |t|
      t.references  :item
      t.references  :offer
      t.string      :title
      t.string      :buyer
      t.string      :seller
      t.float       :price
      t.integer     :quantity
      t.string      :shipping_method
      t.float       :shipping_charge
      t.float       :total
      t.integer     :invoice_id
      t.boolean     :status
      t.timestamps
    end
    add_index :orders,  :item_id,   :unique => true
    add_index :orders,  :offer_id,  :unique => true    
  end

  def self.down
    drop_table :orders
    remove_index  :orders, :item_id
    remove_index  :orders, :offer_id
  end
end

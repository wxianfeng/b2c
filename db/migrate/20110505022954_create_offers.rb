class CreateOffers < ActiveRecord::Migration
  def self.up
    create_table :offers do |t|
      t.references  :item
      t.integer     :parent_id
      t.string      :seller
      t.string      :buyer
      t.float       :price
      t.integer     :quantity
      t.string      :shipping_method
      t.float       :shipping_charge
      t.datetime    :end_date
      t.boolean     :non_negotiable
      t.string      :payment_method
      t.boolean     :status
      t.timestamps
    end
    add_index :offers, :item_id, :unique => true
  end

  def self.down
    drop_table :offers
    remove_index  :offers, :item_id
  end
end

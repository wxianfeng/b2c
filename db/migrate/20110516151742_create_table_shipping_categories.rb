class CreateTableShippingCategories < ActiveRecord::Migration
  def self.up
    create_table :shipping_categories do |t|
      t.string :name , :limit=>60
      t.timestamps      
    end
    rename_column :shippings , :category , :shipping_category_id
    change_column :shippings , :shipping_category_id , :integer , :limit=>11
    
    add_index :shippings , :shipping_category_id
  end

  def self.down
  end
end

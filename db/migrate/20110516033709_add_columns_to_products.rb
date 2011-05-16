class AddColumnsToProducts < ActiveRecord::Migration
  def self.up
    add_column :products , :quantity , :integer , :limit=> 11
    add_column :products , :length , :integer , :limit=> 11
    add_column :products , :width , :integer , :limit=> 11
    add_column :products , :height , :integer , :limit=> 11
    add_column :products , :weight , :integer , :limit=> 11
    add_column :products , :public , :boolean
    add_column :products , :seller_price , :decimal , :precision => 10 , :scale=>2
    add_column :products , :website_price , :decimal , :precision => 10 , :scale=>2
    
    drop_table :prices
  end

  def self.down
  end
end

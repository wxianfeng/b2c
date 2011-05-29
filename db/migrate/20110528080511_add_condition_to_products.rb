class AddConditionToProducts < ActiveRecord::Migration
  def self.up
    add_column :products, :condition, :string
    add_column :products, :negotiable, :boolean
    add_column :products, :brand, :string
    add_index :products, :brand
  end

  def self.down
    remove_column :products, :brand
    remove_column :products, :negotiable
    remove_column :products, :conditio
  end
end
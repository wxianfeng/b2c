class AddConditionToProducts < ActiveRecord::Migration
  def self.up
    add_column :products, :condition, :string
    add_column :products, :negotiable, :boolean
  end

  def self.down
    remove_column :products, :negotiable
    remove_column :products, :conditio
  end
end
class AddColumnShowOrderToCategories < ActiveRecord::Migration
  def self.up
    add_column :categories , :show_order , :integer , :limit=>11 # order category , firstly is show_order MAX
  end  
  
  def self.down
    remove_column :categories , :show_order
  end
end

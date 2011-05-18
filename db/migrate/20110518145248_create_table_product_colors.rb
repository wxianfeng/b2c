class CreateTableProductColors < ActiveRecord::Migration
  def self.up
    create_table :product_colors do |t|
      t.integer :product_id , :limit=>11
      t.integer :color_id , :limit=>11
      
      t.timestamps
    end
    
    add_index :product_colors , [:product_id,:color_id]
  end

  def self.down
  end
end


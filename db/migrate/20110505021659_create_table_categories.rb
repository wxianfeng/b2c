class CreateTableCategories < ActiveRecord::Migration
  def self.up
    create_table :categories do |t|
      t.string :name
      t.integer :category_id , :limit=>11 # self-ref , parent category
      t.boolean :public 
      t.timestamps
    end
    add_index :categories , :category_id
  end

  def self.down
    drop_table :categories
    remove_index :categories , :category_id
  end
end

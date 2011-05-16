class CreateTableShippings < ActiveRecord::Migration
  def self.up
    create_table :shippings do |t|
      t.string :name , :limit=>60
      t.string :category , :limit=>60 # free , not_support , custom
      t.decimal :custom_ship_price ,:precision => 10 , :scale=>2
      
      t.timestamps
    end
  end

  def self.down
  end
end

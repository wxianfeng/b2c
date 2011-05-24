class CreateProductImports < ActiveRecord::Migration
  def self.up
    create_table :product_imports do |t|
      t.integer  :seller_id
      t.string   :name
      t.string   :csv_file_name
      t.string   :csv_content_type
      t.integer  :csv_file_size  
      t.datetime :csv_updated_at  
      t.string   :status
      t.timestamps
    end
    add_index :product_imports, :seller_id
    add_index :product_imports, :status
  end

  def self.down
    drop_table :product_imports
  end
end

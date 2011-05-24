class CreateProductSizes < ActiveRecord::Migration
  def self.up
    create_table :product_sizes do |t|
      t.references :product
      t.string :size
      t.timestamps
    end
  end

  def self.down
    drop_table :product_sizes
  end
end

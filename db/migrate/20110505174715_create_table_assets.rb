class CreateTableAssets < ActiveRecord::Migration
  def self.up
    create_table :assets do |t|
      t.string  :data_file_name 
      t.string  :data_content_type , :limit=>60
      t.integer :data_file_size  , :limit=>11
      t.integer :assetable_id , :limit=>11
		  t.string  :assetable_type, :limit=>30
      t.string  :type, :limit => 25
      t.timestamps
    end
		add_index "assets", ["assetable_id", "assetable_type"], :name => "assets_assetable_id_assetable_type"		
  end

  def self.down
    drop_table :assets
  end
end
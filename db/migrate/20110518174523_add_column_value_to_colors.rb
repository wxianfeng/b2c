class AddColumnValueToColors < ActiveRecord::Migration
  def self.up
    add_column :colors , :value , :string , :limit=>40
  end

  def self.down
  end
end

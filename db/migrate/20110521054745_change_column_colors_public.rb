class ChangeColumnColorsPublic < ActiveRecord::Migration
  def self.up
    change_column :colors , :public ,  :boolean , :default=>true
  end

  def self.down
  end
end

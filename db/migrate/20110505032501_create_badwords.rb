class CreateBadwords < ActiveRecord::Migration
  def self.up
    create_table :badwords do |t|
      t.string  :title
      t.references  :category
      t.string  :action
      t.timestamps
    end
    add_index :badwords, :category_id
  end

  def self.down
    drop_table :badwords
    remove_index  :badwords, :category_id
  end
end

class CreateItemquestions < ActiveRecord::Migration
  def self.up
    create_table :itemquestions do |t|
      t.references  :item
      t.string      :seller
      t.string      :buyer
      t.string      :question_type
      t.string      :question
      t.boolean     :status
      t.string      :image_file_name
      t.string      :image_content_type
      t.integer     :image_file_size
      t.datetime    :image_updated_at
      t.timestamps
    end
    add_index   :itemquestions, :item_id, :unique => true
  end

  def self.down
    drop_table :itemquestions
    remove_index  :itemquestions, :item_id
  end
end

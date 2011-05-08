class RemoveImageUploadForItemQuestions < ActiveRecord::Migration
  def self.up
    remove_column  :item_questions, :image_file_name
    remove_column  :item_questions, :image_content_type
    remove_column  :item_questions, :image_file_size
    remove_column  :item_questions, :image_updated_at
  end

  def self.down
  end
end
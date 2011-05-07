class RenameItemquestionsTable < ActiveRecord::Migration
  def self.up
    rename_table :itemquestions, :item_questions
  end

  def self.down
    rename_table :item_questions, :itemquestions
  end
end
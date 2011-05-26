class AddColumnsToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :first_name, :string
    add_column :users, :last_name, :string
    add_column :users, :address, :string
    add_column :users, :city, :string
    add_column :users, :postal_code, :string
    add_column :users, :country, :string
    add_column :users, :state, :string
    add_column :users, :phone_number, :string
    add_column :users, :lat, :decimal, :precision => 15, :scale => 10
    add_column :users, :lng, :decimal, :precision => 15, :scale => 10
    remove_column :users, :full_name
    
    add_index :users, :lat
    add_index :users, :lng
  end

  def self.down
    remove_column :users, :lng
    remove_column :users, :lat
    remove_column :users, :state
    remove_column :users, :phone_number
    remove_column :users, :country
    remove_column :users, :postal_code
    remove_column :users, :city
    remove_column :users, :address
    remove_column :users, :last_name
    remove_column :users, :first_name
  end
end
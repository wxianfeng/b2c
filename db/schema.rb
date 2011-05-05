# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20110505034039) do

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.integer  "category_id"
    t.boolean  "public"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "show_order"
  end

  add_index "categories", ["category_id"], :name => "index_categories_on_category_id"

  create_table "prices", :force => true do |t|
    t.integer  "product_id"
    t.integer  "quantity_min"
    t.integer  "quantity_max"
    t.decimal  "seller_price",  :precision => 10, :scale => 2
    t.decimal  "website_price", :precision => 10, :scale => 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "prices", ["product_id"], :name => "index_prices_on_product_id"

  create_table "product_tags", :force => true do |t|
    t.integer  "product_id"
    t.integer  "tag_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "product_tags", ["product_id"], :name => "index_product_tags_on_product_id"
  add_index "product_tags", ["tag_id"], :name => "index_product_tags_on_tag_id"

  create_table "products", :force => true do |t|
    t.integer  "seller_id"
    t.integer  "category_id"
    t.string   "name"
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "products", ["category_id"], :name => "index_products_on_category_id"
  add_index "products", ["seller_id"], :name => "index_products_on_seller_id"

  create_table "tags", :force => true do |t|
    t.string   "name",       :limit => 60
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "user_identities", :force => true do |t|
    t.integer  "user_id"
    t.string   "provider"
    t.string   "uid"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.string   "email",                               :default => "", :null => false
    t.string   "encrypted_password",   :limit => 128, :default => "", :null => false
    t.string   "reset_password_token"
    t.datetime "remember_created_at"
    t.string   "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.integer  "sign_in_count",                       :default => 0
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "full_name"
  end

  add_index "users", ["email"], :name => "index_users_on_email", :unique => true
  add_index "users", ["reset_password_token"], :name => "index_users_on_reset_password_token", :unique => true

end

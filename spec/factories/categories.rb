# Read about factories at http://github.com/thoughtbot/factory_girl

Factory.define :category do |f|
  f.name "MyString"
  f.category_id 1
  f.public false
  f.show_order 1
end
Factory.define :category do |f|
  f.name "category_name"
  f.parent_id { |a| a.parent_id }
  f.public true
  f.show_order { |a| a.show_order }
end
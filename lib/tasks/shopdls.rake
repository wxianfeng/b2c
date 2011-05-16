namespace :shopdls do
  
  desc "import shipping categories"
  task :import_shipping_categories => :environment do
    ["EMS","UPS","DHL","FEDEX","TNT","HKPost","ChinaPost"].each do |s|
      attr = { :name=>s }
      ShippingCategory.create attr
    end if ShippingCategory.first.nil?
  end
  
end
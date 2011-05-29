class ShippingPrice < ActiveRecord::Base
  belongs_to :product
  TOP_SHIPPING_COUNTRIES = [['United States', 'US'], ['United Kingdom', 'GB'], ['Australia', 'AU'], ['France', 'FR'], ['Canada', 'CA'], ['Germany', 'GE'], ['Worldwide', 'WW']]
  
  validates :price, :presence => {:message => "You must set shipping price for atleast one country."}
end

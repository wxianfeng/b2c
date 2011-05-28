class ShippingPrice < ActiveRecord::Base
  belongs_to :product
  TOP_SHIPPING_COUNTRIES = ['United States', 'United Kingdom', 'Australia', 'France', 'Canada', 'Germany', 'Japan', 'Asia', 'N. and S. America', 'Spain', 'Worldwide']
end

class CurrencyConversion < ActiveRecord::Base
  validates   :code, :exchange_rate, :presence => true
end

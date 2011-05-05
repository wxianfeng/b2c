class CreateCurrencyConversions < ActiveRecord::Migration
  def self.up
    create_table :currency_conversions do |t|
      t.string  :code
      t.float   :exchange_rate
      t.timestamps
    end
  end

  def self.down
    drop_table :currency_conversions
  end
end

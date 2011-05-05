class Badword < ActiveRecord::Base
  validates :title, :presence => true, :unique => true
end

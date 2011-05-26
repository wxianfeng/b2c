class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :trackable, :validatable

  include User::OmniAuthExtension

  # attr_accessible :first_name, :email, :password, :password_confirmation
  
  # validates :first_name, :presence => true

  def full_name_with_email
    "#{self[:last_name]} (#{email})"
  end
end

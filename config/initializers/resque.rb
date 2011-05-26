require 'resque/job_with_status'
rails_root  = ENV['RAILS_ROOT'] || File.dirname(__FILE__) + '/../..'
rails_env   = ENV['RAILS_ENV'] || 'development'

resque_config = YAML.load_file(rails_root + '/config/resque.yml')
Resque.redis = resque_config[rails_env]
Resque::Status.expire_in = (24 * 60 * 60) # 24hrs in seconds
# Require recursively all files in the lib/patches
# Dir[Rails.root.join('lib/patches/**/*.rb')].each {|f| require f}

# Require only files placed in the lib folder
Dir[Rails.root.join('lib/*.rb')].each {|f| require f}

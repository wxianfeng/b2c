require "spec_helper"

describe "TEST routes about assets" do
  
  before :each do
    @asset = Asset::Asset.create
  end
  
  it "assets#show" do
    p asset_path(@asset)
  end
  
end
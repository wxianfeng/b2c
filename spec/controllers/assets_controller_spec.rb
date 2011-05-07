require "spec_helper"

describe "About assets controller" do
  
  describe "About route helpers" do
    before :each do
      @asset = Asset::Asset.crate
    end
   
    it "assets#show" do
      p asset_path(@asset)
    end
    
  end
  
  
end

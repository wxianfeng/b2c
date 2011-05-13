require 'spec_helper'

describe Category do
  
  before :each do
    Category.destroy_all
    ##
    # xx -> xx1 -> xx1_1
    @category = Factory(:category,:name=>"xx",:show_order=>1)
    @category1 = Factory(:category,:name=>"xx1",:parent_id=>@category.id,:show_order=>2)
    @category1_1 = Factory(:category,:name=>"xx1_1",:parent_id=>@category1.id,:show_order=>3)
  end
  
  it "test parents method" do  
    @category1_1.parents.size == 2
  end
  
  it "test all_categories method" do
    Category.all_categories.should == {"xx"=>["xx1"], "xx1"=>["xx1_1"], "xx1_1"=>[]}
    Category.all_categories.to_json.should == "{\"xx\":[\"xx1\"],\"xx1\":[\"xx1_1\"],\"xx1_1\":[]}"
  end
  
end

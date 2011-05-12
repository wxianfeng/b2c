require 'spec_helper'

describe Category do
  
  before :each do
    Category.destroy_all
  end
  
  it "test parents method" do
    @category = Factory(:category,:name=>"xx",:show_order=>1)
    @category1 = Factory(:category,:name=>"xx1",:parent_id=>@category.id,:show_order=>2)
    @category1_1 = Factory(:category,:name=>"xx1_1",:parent_id=>@category1.id,:show_order=>3)
    @category1_1.parents.size == 2
  end
  
end

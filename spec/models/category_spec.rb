require 'spec_helper'

describe Category do
  
  before :each do
    @category = Category.create(:name=>"xx",:show_order=>1)
    @category1 = Category.create(:name=>"xx1",:parent_id=>@category.id,:show_order=>2)
    @category1_1 = Category.create(:name=>"xx1_1",:parent_id=>@category1.id,:show_order=>3)
  end
  
  it "test parents method" do
    p @category1_1.parents
  end
  
end

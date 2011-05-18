require 'spec_helper'

describe "colors/index.html.erb" do
  before(:each) do
    assign(:colors, [
      stub_model(Color,
        :name => "Name",
        :public => false
      ),
      stub_model(Color,
        :name => "Name",
        :public => false
      )
    ])
  end

  it "renders a list of colors" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => "Name".to_s, :count => 2
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "tr>td", :text => false.to_s, :count => 2
  end
end

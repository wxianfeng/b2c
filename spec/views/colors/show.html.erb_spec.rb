require 'spec_helper'

describe "colors/show.html.erb" do
  before(:each) do
    @color = assign(:color, stub_model(Color,
      :name => "Name",
      :public => false
    ))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/Name/)
    # Run the generator again with the --webrat flag if you want to use webrat matchers
    rendered.should match(/false/)
  end
end

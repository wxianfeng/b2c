require 'spec_helper'

describe "colors/new.html.erb" do
  before(:each) do
    assign(:color, stub_model(Color,
      :name => "MyString",
      :public => false
    ).as_new_record)
  end

  it "renders new color form" do
    render

    # Run the generator again with the --webrat flag if you want to use webrat matchers
    assert_select "form", :action => colors_path, :method => "post" do
      assert_select "input#color_name", :name => "color[name]"
      assert_select "input#color_public", :name => "color[public]"
    end
  end
end

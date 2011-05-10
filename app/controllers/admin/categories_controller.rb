class Admin::CategoriesController < ApplicationController
  
  def index
    @categories = Category.all
    @chart = Shopdls::OrgChart.new
    @chart.add_column('string', 'Name' )
    @chart.add_column('string', 'Manager')
    @chart.add_column('string', 'ToolTip')
    @chart.add_rows( [
        [ {:v => 'Mike', :f => 'Mike<div style="color:red; font-style:italic">President</div>' }, '' , 'The President' ],
        [ {:v => 'Jim' , :f => 'Jim<div style="color:red; font-style:italic">Vice President<div>'}, 'Mike', 'VP' ],
        [ 'Alice' , 'Mike', '' ],
        [ 'Bob' , 'Jim' , 'Bob Sponge' ],
        [ 'Carol' , 'Bob' , '' ]
      ] )

    options = { :allowHtml => true }
    options.each_pair do | key, value |
      @chart.send "#{key}=", value
    end
  end
  
end

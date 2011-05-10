class Admin::CategoriesController < ApplicationController
  before_filter :find_category , :only=>[:show,:edit,:update,:destroy]
  
  def index
    @categories = Category.order("show_order DESC")
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
  
  def new
    @category = Category.new
  end
  
  def create
    @category = Category.new(params[:category])
    if @category.save
      redirect_to admin_category_path(@category)  , :notice=>"create success"
    else
      redirect_to :back , :notice=>"ERROR"
    end
  end
  
  def show
  end
  
  def edit
  end
  
  def update
    if @category.update_attributes(params[:category])
      redirect_to admin_category_path(@category) , :notice => "Update Success"
    else
      redirect_to :back , :notice=>"ERROR"
    end
  end
  
  def destroy
    if @category.destroy
      redirect_to admin_categories_path , :notice=>"Delete Success"
    else
      redirect_to :back , :notice=>"ERROR"
    end
  end
  
  protected
  
  def find_category
    @category = Category.find_by_id(params[:id])
  end
  
end

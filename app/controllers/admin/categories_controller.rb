class Admin::CategoriesController < ApplicationController
  layout "admin"
  before_filter :find_category , :only=>[:show,:edit,:update,:destroy]
  
  def index
   @categories = Category.all
  end
  
  def new
    @category = Category.new
  end
  
  def create
    @category = Category.new(params[:category])
    if @category.save
      redirect_to admin_category_path(@category)  , :notice=>"create success"
    else
      render :new
    end
  end
  
  def edit
    @category = Category.find(params[:id])
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
  
  def get_category
    category_name = params[:name]
    category = Category.find_by_name(category_name)
    names = category.parents(true).reverse.map(&:name).join("->")
    render :json => {"category_id"=>category.id,"names"=>names}.to_json
  end
  
  protected  
  def find_category
    @category = Category.find_by_id(params[:id])
  end
  
end

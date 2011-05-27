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
    category = Category.find_by_id(params[:category_id])
    children = category.children
    data = {}
    children.each{|c| data[c.id] = c.name }
    respond_to do |f|
      f.js { render :json => data.to_json }
    end
  end

  protected
    def find_category
      @category = Category.find_by_id(params[:id])
    end

end

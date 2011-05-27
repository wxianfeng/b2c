class My::ProductsController < ApplicationController
  before_filter :load_product_details, :only => [:new, :create, :edit, :update]
  
  def index
    @products = current_user.products
  end
  
  def new
    @product       = Product.new       
  end
  
  def create
    category = Category.find_by_name(params[:category_name])
    @product = Product.new(params[:product])
    @product.category_id = category.id
    tags = params[:tags].split(/,/).uniq
    
    tags.each do |tag|
      @product.tags << Tag.new({:name=>tag})
    end
    
    if @product.save
      redirect_to [:my,@product] , :notice=>"create success!"
    else
      render :new
    end
  end
  
  def show
    @product = Product.find_by_id(params[:id])
  end
  
  def load_product_details
    @colors = Color.all
    @product_draft = ProductDraft.create
  end
  
end

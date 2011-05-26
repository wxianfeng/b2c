class My::ProductsController < ApplicationController
  before_filter :load_product_details, :only => [:new, :create, :edit, :update]
  
  def index
  end
  
  def new
    @product       = Product.new       
  end
  
  def create
    @product = Product.new(params[:product])
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

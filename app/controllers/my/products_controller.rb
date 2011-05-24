class My::ProductsController < ApplicationController
  
  def index
  end
  
  def new
    @product = Product.new
    @colors  = Color.all
    @product_draft = ProductDraft.create   
  end
  
  def create
    category = Category.find_by_name(params[:category_name])
    @product = Product.new(params[:product].merge(:category_id=>category.id))
    tags = params[:tags].split(/,/).uniq
    tags.each do |tag|
      @product.tags << Tag.new({:name=>tag})
    end
    if @product.save
      redirect_to [:my,@product] , :notice=>"create success!"
    else
      # render :new
      redirect_to :back
    end
  end
  
  def show
    @product = Product.find_by_id(params[:id])
  end
end

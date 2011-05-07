class ProductsController < ApplicationController
  
  def new
    @product = Product.new
    @product_draft = ProductDraft.create    
  end
  
  def create
    @product = Product.new(params[:product])
    tags = params[:tags].split(/,/).uniq
    tags.each do |tag|
      @product.tags << Tag.new({:name=>tag})
    end
    if @product.save
      redirect_to @product , :notice=>"create success!"
    else
      render :new
    end
  end
  
  def show
    @product = Product.find_by_id(params[:id])
  end


end

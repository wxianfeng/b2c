class ItemsController < ApplicationController
  def index
    @items = Item.all

    respond_to do |format|
      format.html 
    end
  end

  def show
    @item = Item.find(params[:id])

    respond_to do |format|
      format.html 
    end
  end

  def new
    @item = Item.new

    respond_to do |format|
      format.html 
    end
  end

  def edit
    @item = Item.find(params[:id])
  end

  def create
    @item = Item.new(params[:item])
    
    respond_to do |format|
      if @item.save
        format.html { redirect_to(item_url(@item), :notice => 'Item was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to(item_url(@item), :notice => 'Item was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to(items_url) }
    end
  end
end

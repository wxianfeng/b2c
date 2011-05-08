class OrdersController < ApplicationController
  def index
    @orders = Offer.all

    respond_to do |format|
      format.html 
    end
  end

  def show
    @order = Order.find(params[:id])

    respond_to do |format|
      format.html 
    end
  end

  def new
    @order = Order.new

    respond_to do |format|
      format.html 
    end    
  end

  def edit
    @order = Order.find(params[:id])
  end

  def create
    @order = Order.new(params[:order])
    
    respond_to do |format|
      if @order.save
        format.html { redirect_to(order_url(@order), :notice => 'Order was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    @order = Order.find(params[:id])

    respond_to do |format|
      if @order.update_attributes(params[:order])
        format.html { redirect_to(order_url(@order), :notice => 'Order was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @order = Order.find(params[:id])
    @order.destroy

    respond_to do |format|
      format.html { redirect_to(orders_url) }
    end
  end
end

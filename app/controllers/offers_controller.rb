class OffersController < ApplicationController
  def index
    @offers = Offer.all

    respond_to do |format|
      format.html 
    end
  end

  def show
    @offer = Offer.find(params[:id])

    respond_to do |format|
      format.html 
    end
  end

  def new
    @offer = Offer.new

    respond_to do |format|
      format.html 
    end
    
  end

  def edit
    @offer = Offer.find(params[:id])
  end

  def create
    @offer = Offer.new(params[:offer])
    
    respond_to do |format|
      if @offer.save
        format.html { redirect_to(offer_url(@offer), :notice => 'Offer was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    @offer = Offer.find(params[:id])

    respond_to do |format|
      if @offer.update_attributes(params[:offer])
        format.html { redirect_to(offer_url(@offer), :notice => 'Offer was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @offer = Offer.find(params[:id])
    @offer.destroy

    respond_to do |format|
      format.html { redirect_to(offers_url) }
    end
  end
end

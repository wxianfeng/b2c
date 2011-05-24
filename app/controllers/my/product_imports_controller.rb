class ProductImportsController < ApplicationController
  def new
    @import = Import.new
  end

  def create
    @import = Import.new(params[:import])
    respond_to do |format|
      if @import.save!
        flash[:notice] = 'CSV data was successfully imported.'
        format.html { redirect_to(@import) }
      else
        flash[:error] = 'CSV data import failed.'
        format.html { render :action => "new" }
      end
    end
  end

  def show
    @import = Import.find(params[:id])
  end
end

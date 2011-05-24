class My::ProductImportsController < ApplicationController
  def new
    @product_import = ProductImport.new
  end

  def create
    @product_import = ProductImport.new(params[:product_import])
    respond_to do |format|
      if @product_import.save
        flash[:notice] = 'CSV data was successfully imported.'
        format.html { redirect_to(@product_import) }
      else
        flash[:error] = 'CSV data import failed.'
        format.html { render :action => "new" }
      end
    end
  end

  def show
    @product_import = ProductImport.find(params[:id])
  end
end

class My::ProductImportsController < ApplicationController
  def new
    @product_import = ProductImport.new
  end

  def create
    @product_import = ProductImport.new(params[:product_import])
    respond_to do |format|
      if @product_import.save
        flash[:notice] = 'CSV data was successfully imported.'
        format.html { redirect_to(my_product_import_url(@product_import)) }
      else
        flash[:error] = 'CSV data import failed.'
        format.html { render :action => "new" }
      end
    end
  end

  def show
    @product_import = ProductImport.find(params[:id])
  end
  
  protected
  
  def ensure_user_has_no_pending_imports_in_queue
    if current_user.product_imports.pending.present?
      flash[:error] = "You have another product import in queue. Please wait until one import is complete."
      return redirect_to my_product_imports_url
    end
  end
end

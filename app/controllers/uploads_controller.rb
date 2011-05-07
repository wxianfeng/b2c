class UploadsController < ApplicationController
  
  def create  
    file = params[:Filedata]
    file.content_type = MIME::Types.type_for(file.original_filename)
    @upload = Upload::Picture.new(:data => file , :product_id=>params[:product_draft_id])
    if @upload.save            
      flash[:notice] = 'upload success'
      respond_to do |format|
         format.json {render :json => { :result => 'success', :upload => upload_path(@upload) } }
      end      
    else
      redirect_to :back
    end
  end
  
  def show
    @upload = Upload::Picture.find(params[:id], :include => :product)     
  end

end

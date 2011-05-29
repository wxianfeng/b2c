class UploadsController < ApplicationController
  layout false
  
  def create  
    file = params[:Filedata]
    file.content_type = MIME::Types.type_for(file.original_filename)
    @upload = Upload::Picture.new(:data => file , :product_id=>params[:product_draft_id])
    if @upload.save
      flash[:notice] = 'upload success'
      respond_to do |f|
         f.json {render :json => { :image => {:path => @upload.thumb_url, :image_id => @upload.id } } }
      end      
    else
      redirect_to :back
    end
  end
  
  def show
    @upload = Upload::Picture.find(params[:id], :include => :product)     
    render :layout=>false if request.xhr?
  end
  
  def destroy
    @upload = Upload::Picture.find(params[:id])
    @upload.destroy
    render :nothing=>true
  end

end

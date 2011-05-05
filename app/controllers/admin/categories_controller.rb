class Admin::CategoriesController < ApplicationController
  inherit_resources

  protected

  def collection
    @categories ||= end_of_association_chain.page(params[:page])
  end
end

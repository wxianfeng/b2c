class ItemQuestionsController < ApplicationController
  def index
    @item_questions = ItemQuestion.all

    respond_to do |format|
      format.html 
    end
  end

  def show
    @item_question = ItemQuestion.find(params[:id])

    respond_to do |format|
      format.html 
    end
  end

  def new
    @item_question = ItemQuestion.new

    respond_to do |format|
      format.html 
    end
  end

  def edit
    @item_question = ItemQuestion.find(params[:id])
  end

  def create
    @item_question = ItemQuestion.new(params[:item_question])
    
    respond_to do |format|
      if @item_question.save
        format.html { redirect_to(item_question_url(@item_question), :notice => 'Item Question was successfully created.') }
      else
        format.html { render :action => "new" }
      end
    end
  end

  def update
    @item_question = ItemQuestion.find(params[:id])

    respond_to do |format|
      if @item_question.update_attributes(params[:item_question])
        format.html { redirect_to(item_question_url(@item_question), :notice => 'Item Question was successfully updated.') }
      else
        format.html { render :action => "edit" }
      end
    end
  end

  def destroy
    @item_question = ItemQuestion.find(params[:id])
    @item_question.destroy

    respond_to do |format|
      format.html { redirect_to(item_questions_url) }
    end
  end
end

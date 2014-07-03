class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_commentable
    @commentable = params[:commentable].classify.constantize.find(commentable_id)
  end

  def commentable_id
    params[(params[:commentable].singularize + "_id").to_sym]
  end
end

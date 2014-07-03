class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_voteable
    @voteable = params[:voteable].classify.constantize.find(voteable_id)
  end

  def voteable_id
    params[(params[:voteable].singularize + "_id").to_sym]
  end
end

class ProblemsController < ApplicationController
  protect_from_forgery
  before_action :load_user, only: :create

  def index
    @problems = Problem.all
    @user = current_user
  end

  def show
    @problem = Problem.find params[:id]
  end

  def new
    @problem = Problem.new
  end

  private

  def load_user
    @user = User.find(params[:user_id])
  end
end

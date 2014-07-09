class ProblemsController < ApplicationController
  protect_from_forgery
  require 'json'
  include ProblemDataFormatHelper

  # before_action :load_user, only: :create

  def index
    @problems = Problem.all
  end

  def show
    @solution = Solution.new
    problem = Problem.find params[:id]
    @form_problem = problem
    @problem = format_problem_for_client(problem)
  end

  def create
    @problem = Problem.new(problem_params)
    @problem.user_id = current_user.id
    if @problem.save
      redirect_to problem_path(@problem)
    else
      flash.now[:notice] = "All fields must be populated!"
      render :new
    end
  end

  def new
    @problem = Problem.new
  end

  private

  def problem_params
    params.require(:problem).permit(:title, :description)
  end

end

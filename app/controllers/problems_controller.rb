class ProblemsController < ApplicationController
  protect_from_forgery
  require 'json'
  # before_action :load_user, only: :create

  def index
    @problems = Problem.all
  end

  def show
    problem = Problem.find params[:id]
    solutions = []
    problem.solutions.each do |solution|
      solutions << {id: solution.id,
                  title: solution.title,
                  description: solution.description,
                  email: solution.user.username
                  }
    end

     @problem = {problem: {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      solutions: solutions
      }
    }
    @problem.to_json

  end

  def create
    @problem = Problem.new(problem_params)
    @problem.user_id = 1
    if @result = @problem.save
      redirect_to problem_path(@problem)
    else
      flash.now[:notice] = "All fields must be populated!"
      render :new, :error => @problem
    end
  end

  def new
    @problem = Problem.new
  end

  private

  # def load_user
  #   @user = User.find(params[:user_id])
  # end

  def problem_params
    params.require(:problem).permit(:title, :description)
  end
end

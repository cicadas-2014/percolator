class ProblemsController < ApplicationController
  protect_from_forgery
  require 'json'
  # before_action :load_user, only: :create

  def index
    @problems = Problem.all
  end

  def show
    problem = Problem.find params[:id]
    @form_problem = problem
    @solution = Solution.new
    solutions = []
    improvements = []
    problem.solutions.each do |solution|
      solution.improvements.each do |improvement|
        improvements << {id: improvement.id,
          title: improvement.title,
          description: improvement.description,
          username: improvement.user.username,
          upvotes: improvement.voteables.where(vote_type: true).count,
          downvotes: improvement.voteables.where(vote_type: false).count
        }
        end
        solutions << {id: solution.id,
          title: solution.title,
          description: solution.description,
          username: solution.user.username,
          improvements: improvements,
          upvotes: solution.voteables.where(vote_type: true).count,
          downvotes: solution.voteables.where(vote_type: false).count

        }
    end

    @problem = {
      id: problem.id,
      title: problem.title,
      description: problem.description,
      solutions: solutions
      }.to_json.html_safe

    p @problem
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

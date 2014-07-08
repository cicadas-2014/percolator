class SolutionsController < ApplicationController
  include ProblemDataFormatHelper
  protect_from_forgery

  def create
    @problem = Problem.find params[:problem_id]
    @solution = Solution.new(solution_params)
    @solution.user_id = current_user.id
    @solution.problem_id = params[:problem_id]
    if @solution.save
      render json: {  id: @solution.id,
                      problem: format_problem_for_client(@problem),
                      title: @solution.title,
                      description: @solution.description,
                      save_status: true
                    }
    else
      render json: { title: @solution.title,
                      description: @solution.description,
                      save_status: false
                    }
    end
  end

  def show
    solution = Solution.find params[:id]
    @form_solution = solution
    @improvement = Improvement.new
    improvements = []
    solution.improvements.each do |improvement|
      improvements << {id: improvement.id,
                    title: improvement.title,
                    description: improvement.description,
                    username: improvement.user.username
      }
    end

    @solution = {
        id: solution.id,
        # title: solution.title,
        # description: solution.description,
        improvements: improvements
    }.to_json.html_safe
    @solution
  end

  private

  def solution_params
    params.require(:solution).permit(:title, :description)
  end
end

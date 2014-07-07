class SolutionsController < ApplicationController
  protect_from_forgery
  def create
    p "=" * 50
    @problem = Problem.find params[:problem_id]
    @solution = Solution.new(solution_params)
    respond_to do |format|
      if @solution.save
        p "=" * 40
        p "=" * 40
        p "I was saved!"
        p "=" * 40
        # format.html { redirect_to @solution, notice: "Solution was successfully created." }
        # format.js {}
        format.json { render json: @solution, status: :created}
      else
        # format.html {}
        format.json { render json: @solution.errors, status: :unprocessable_entity }
      end
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

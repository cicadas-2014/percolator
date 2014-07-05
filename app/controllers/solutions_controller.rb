class SolutionsController < ApplicationController
  protect_from_forgery
  def create
    p "=" * 50
    @problem = Problem.find params[:problem_id]
    @solution = Solution.new(solution_params)
    respond_to do |format|
      if @solution.save
        # format.html { redirect_to @solution, notice: "Solution was successfully created." }
        # format.js {}
        format.json { render json: @solution, status: :created, location: problem_path(@problem)}
      else
        # format.html {}
        format.json { render json: @solution.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def solution_params
    params.require(:solution).permit(:title, :description)
  end
end

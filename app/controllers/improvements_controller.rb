class ImprovementsController < ApplicationController
  protect_from_forgery
  def send
  	@solution = Solution.find params[:id]
  	respond_to do |format|
  		format.json { render json: @solution, status: :created}
  	end
  end

  def create
    @solution = Solution.find params[:solution_id]
    @improvement = Improvement.new(improvement_params)
    respond_to do |format|
      if @improvement.save
        # format.html { redirect_to @improvement, notice: "Improvement was successfully created." }
        # format.js {}
        format.json { render json: @improvement, status: :created}
      else
        # format.html {}
        format.json { render json: @improvement.errors, status: :unprocessable_entity }
      end
    end
  end

  private

  def improvement_params
    params.require(:improvement).permit(:title, :description)
  end
end

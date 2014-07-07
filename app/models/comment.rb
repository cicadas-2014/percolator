class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  def create

  end

  private

  def problem_comments
    problem_number = params[:problem_id]
    @comments = {
      problems: Comment.where(commentable_type: "problem", commentable_id: problem_number)
    }.to_json
    respond_to do |format|
      format.js { render json: @comments}
    end
  end

  def problem_solutions
    solution_number = params[:solution_id]
    @comments = {
      solutions: Comment.where(commentable_type: "solution", commentable_id: solution_number)
    }.to_json
    respond_to do |format|
      format.js { render json: @comments}
    end
  end

  def problem_improvements
    improvement_number = params[:improvement_id]
    @comments = {
      improvements: Comment.where(commentable_type: "improvement", commentable_id: improvement_number)
    }
    respond_to do |format|
      format.js { render json: @comments}
    end
  end
end

class CommentsController < ApplicationController
  protect_from_forgery

  def create

  end

  def problem_comments
    problem_number = params[:problem_id]
    @comments = {
      problems: Comment.where(commentable_type: "problem", commentable_id: problem_number)
    }
    p @comments
    render json: { problems: @comments}
  end

  def problem_solutions
    solution_number = params[:solution_id]
    @comments = {
      solutions: Comment.where(commentable_type: "solution", commentable_id: solution_number)
    }
    render json: { problems: @comments}
    end
  end

  def problem_improvements
    improvement_number = params[:improvement_id]
    @comments = {
      improvements: Comment.where(commentable_type: "improvement", commentable_id: improvement_number)
    }
    render json: { problems: @comments}
  end
end

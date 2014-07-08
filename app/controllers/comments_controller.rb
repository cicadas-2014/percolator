class CommentsController < ApplicationController
  protect_from_forgery

  def create

  end

  def problem_comments
    problem_number = params[:problem_id]
    @comments = Comment.where(commentable_type: "problem", commentable_id: problem_number)
    p @comments
    render json: { problems: @comments}
  end

  def solution_comments
    solution_number = params[:solution_id]
    @comments = Comment.where(commentable_type: "solution", commentable_id: solution_number)
    p @comments
    render json: { solutions: @comments}
  end

  def improvement_comments
    improvement_number = params[:improvement_id]
    @comments = Comment.where(commentable_type: "improvement", commentable_id: improvement_number)
    render json: { improvements: @comments}
  end
end

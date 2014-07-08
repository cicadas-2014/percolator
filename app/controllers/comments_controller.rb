class CommentsController < ApplicationController
  protect_from_forgery

  def determine_type(params)
    types = %w(problem_id solution_id improvement_id)
    types.each_with_index do |type, index|
      return type if params.include?(type)
    end
  end

  def determine_id(params, parsed_type)
    return params[parsed_type]
  end

  def ready_comment_params(params)
    parsed_type = determine_type(params)
    parsed_id = determine_id(params, parsed_type)
    parsed_type.slice!("_id")
    return [parsed_type.classify.constantize.find(parsed_id), parsed_type, parsed_id]
  end

  def create
    comment_params = ready_comment_params(params)
    @comment = Comment.new(description: params[:comment_description], commentable_type: comment_params[1],
      commentable_id: comment_params[2], user: current_user, username: current_user.email)

    if @comment.save
      render json: { description: @comment.description,
                    commentable_type: @comment.commentable_type,
                    commentable_id: @comment.commentable_id,
                    username: @comment.user.email,
                    saved: true
                  }
    else
      # flash.now[:notice] = "Comment can't be blank"
      render json: { description: @comment.description,
                    commentable_type: @comment.commentable_type,
                    commentable_id: @comment.commentable_id,
                    username: @comment.user.email,
                    saved: false
                  }
    end
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

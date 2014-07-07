class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  private

  def problem_comments(problem_number)
    @comments = {
      prob_comment: Comment.where(commentable_type: "problem", commentable_id: problem_number)
    }
  end

  def problem_solutions(problem_number, solution_number)
    @comments = {
      sol_comment: Comment.where(commentable_type: "solution", commentable_id: solution_number)
    }
  end

  def problem_improvements(problem_number, improvement_number)
    @comments = {
      imp_comment: Comment.where(commentable_type: "improvement", commentable_id: improvement_number)
    }
  end
end

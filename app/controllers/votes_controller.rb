class VotesController < ApplicationController
  def solution_upvote
    solution = Solution.find params[:solution_number]
    upvote = solution.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = solution.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !upvote
      if downvote
        downvote.destroy
      end
      solution.voteables.create(user_id: current_user.id, vote_type: true)
    end
    @vote_count = [solution.voteables.where(vote_type: true).count, solution.voteables.where(vote_type: false).count]
    respond_to do |format|
      format.js {render json: @vote_count}
    end
  end

  def solution_downvote
    solution = Solution.find params[:solution_number]
    upvote = solution.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = solution.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !downvote
      if upvote
        upvote.destroy
      end
      solution.voteables.create(user_id: current_user.id, vote_type: false)
    end
    @vote_count = [solution.voteables.where(vote_type: true).count, solution.voteables.where(vote_type: false).count]
    respond_to do |format|
      format.js {render json: @vote_count}
    end
  end

  def problem_upvote
    problem = Problem.find params[:problem_number]
    upvote = problem.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = problem.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !upvote
      if downvote
        downvote.destroy
      end
      problem.voteables.create(user_id: current_user.id, vote_type: true)
    end
    @vote_count = [problem.voteables.where(vote_type: true).count, problem.voteables.where(vote_type: false).count]
    respond_to do |format|
      format.js {render json: @vote_count}
    end
  end

  def problem_downvote
    problem = Problem.find params[:problem_number]
    upvote = problem.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = problem.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !downvote
      if upvote
        upvote.destroy
      end
      problem.voteables.create(user_id: current_user.id, vote_type: false)
    end
    @vote_count = [problem.voteables.where(vote_type: true).count, problem.voteables.where(vote_type: false).count]
    respond_to do |format|
      format.js {render json: @vote_count}
    end
  end
end

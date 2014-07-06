class VotesController < ApplicationController
  def upvote
    solution = Solution.find 10
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

  def downvote
    solution = Solution.find 10
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
end
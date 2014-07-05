class VoteController < ApplicationController
  def upvote
    solution = Solution.find params[:id]
    upvote = solution.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = solution.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !upvote
      if downvote
        downvote.destroy
      end
      solution.voteables.create(user_id: current_user.id, vote_type: true)
    end
      vote_count = [solution.voteables.where(vote_type: true).count, solution.voteables.where(vote_type: false).count]
      return vote_count
  end

  def downvote
    solution = Solution.find params[:id]
    upvote = solution.voteables.find_by(user_id: current_user.id, vote_type: true)
    downvote = solution.voteables.find_by(user_id: current_user.id, vote_type: false)
    if !downvote
      if upvote
        upvote.destroy
      end
      solution.voteables.create(user_id: current_user.id, vote_type: false)
    end
      vote_count = [solution.voteables.where(vote_type: true).count, solution.voteables.where(vote_type: false).count]
      return vote_count
  end
end
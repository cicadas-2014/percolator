class User < ActiveRecord::Base
  # has_many :interests
  has_many :problems
  has_many :solutions
  has_many :challenges
  has_many :votes, as: :voteable

  def voteables
    Vote.where(user_id: self.id)
  end
end

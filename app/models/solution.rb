class Solution < ActiveRecord::Base
  has_many :challenges
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :problem

  def voteables
    Vote.where(voteable_type: "solution", voteable_id: self.id)
  end
end

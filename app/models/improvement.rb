class Improvement < ActiveRecord::Base
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :problem
  belongs_to :solution

  def voteables
    Vote.where(voteable_type: "improvement", voteable_id: self.id)
  end
end

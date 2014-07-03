class Idea < ActiveRecord::Base
  has_many :solutions
  has_many :votes, as: :voteable
  belongs_to :user

  def voteables
    Vote.where(voteable_type: "idea", voteable_id: self.id)
  end
end

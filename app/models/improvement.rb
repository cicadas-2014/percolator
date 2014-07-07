class Improvement < ActiveRecord::Base
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :solution

  validates :title, presence: true, uniqueness: true
  validates :description, presence: true
  validates_presence_of :user_id
  validates_presence_of :solution_id

  def voteables
    Vote.where(voteable_type: "improvement", voteable_id: self.id)
  end

  def commentables
    Comment.where(commentable_type: "improvement", commentable_id: self.id)
  end
end

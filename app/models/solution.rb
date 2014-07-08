class Solution < ActiveRecord::Base
  has_many :improvements
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :problem

  validates :title, presence: true, uniqueness: true
  validates :description, presence: true

  validates_presence_of :user_id
  validates_presence_of :problem_id

  def voteables
    Vote.where(voteable_type: "solution", voteable_id: self.id)
  end

  def commentables
    Comment.where(commentable_type: "solution", commentable_id: self.id)
  end
end

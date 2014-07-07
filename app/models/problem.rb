class Problem < ActiveRecord::Base
  has_many :solutions
  has_many :votes, as: :voteable
  belongs_to :user

  validates :title, presence: true, uniqueness: true
  validates :description, presence: true
  validates_presence_of :user_id


  def voteables
    Vote.where(voteable_type: "problem", voteable_id: self.id)
  end

  def commentables
    Comment.where(commentable_type: "problem", commentable_id: self.id)
  end
end

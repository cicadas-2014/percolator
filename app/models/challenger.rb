class Challenger < ActiveRecord::Base
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :idea
  belongs_to :solution
end

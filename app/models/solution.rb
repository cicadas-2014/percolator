class Solution < ActiveRecord::Base
  has_many :challenges
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :idea
end

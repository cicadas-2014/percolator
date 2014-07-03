class User < ActiveRecord::Base
  # has_many :interests
  has_many :ideas
  has_many :solutions
  has_many :challenges
  has_many :votes, as: :voteable
end

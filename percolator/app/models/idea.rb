class Idea < ActiveRecord::Base
  has_many :solutions
  has_many :votes, as: :voteable
  belongs_to :user
end

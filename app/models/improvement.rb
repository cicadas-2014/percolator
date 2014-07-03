class Improvement < ActiveRecord::Base
  has_many :votes, as: :voteable
  belongs_to :user
  belongs_to :problem
  belongs_to :solution
end

class User < ActiveRecord::Base
  has_secure_password

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # has_many :interests
  has_many :problems
  has_many :solutions
  has_many :improvements
  has_many :votes, as: :voteable

  def voteables
    Vote.where(user_id: self.id)
  end
end

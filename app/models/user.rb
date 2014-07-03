class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  # has_many :interests
  has_many :problems
  has_many :solutions
  has_many :challenges
  has_many :votes, as: :voteable

  def voteables
    Vote.where(user_id: self.id)
  end
end

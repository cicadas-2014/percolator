require 'spec_helper'

describe Problem do
  title = "Curbing sensationalism in the media"
  description = "There is tendency for the press to play up and dwell on stories that
   are sensational - murders, car crashes, kidnappings, sex scandals and the like."
  let!(:user) { create :user }

  context "validations" do
    it "is valid with a title and description" do
      problem = create_problem_with(title, description, user)
      expect(problem).to be_valid
    end

    it "is invalid with an empty title" do
      problem = create_problem_with(nil, description, user)
      expect(problem).to have(1).errors_on(:title)
    end

    it "is invalid with a duplicate title" do
      problem = create_problem_with(title, description, user)
      expect(Problem.new(title: title, description: description, user: user)).to have(1).errors_on(:title)
    end

    it "is invalid with an empty description" do
      problem = create_problem_with(title, nil, user)
      expect(problem).to have(1).errors_on(:description)
    end

    it "is invalid without a user association" do
      expect(Problem.create(title: title, description: description, user_id: nil)).to have(1).errors_on(:user_id)
    end
  end

  def create_problem_with(title, description, user)
    Problem.create(title: title, description: description, user_id: user.id)
  end
end

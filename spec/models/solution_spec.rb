require 'spec_helper'

describe Solution do
  title = "Pass out MORE bagels every day"
  description = "Bagels have the highest density of nutrition out of any breakfast wheat product."
  let!(:user) { create :user }
  let!(:problem) { create :problem }

  context "validations" do
    it "is valid with a title and description" do
      solution = create_solution_with(title, description, user, problem)
      expect(solution).to be_valid
    end

    it "is invalid with an empty title" do
      solution = create_solution_with(nil, description, user, problem)
      expect(solution).to have(1).errors_on(:title)
    end

    it "is invalid with a duplicate title" do
      solution = create_solution_with(title, description, user, problem)
      expect(Solution.new(title: title, description: description, user: user, problem: problem)).to have(1).errors_on(:title)
    end

    it "is invalid with an empty description" do
      solution = create_solution_with(title, nil, user, problem)
      expect(solution).to have(1).errors_on(:description)
    end

    it "is invalid without a user association" do
      expect(Solution.create(title: title, description: description, user_id: nil, problem: problem)).to have(1).errors_on(:user_id)
    end

    it "is invalid without a problem association" do
    	expect(Solution.create(title: title, description: description, user: user, problem_id: nil)).to have(1).errors_on(:problem_id)
    end
  end

  def create_solution_with(title, description, user, problem)
    Solution.create(title: title, description: description, user_id: user.id, problem_id: problem.id)
  end
end

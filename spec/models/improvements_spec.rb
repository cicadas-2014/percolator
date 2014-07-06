require 'spec_helper'

describe Solution do
  title = "Pass out bagels every day"
  description = "Bagels have the highest density of nutrition out of any breakfast wheat product."
  let!(:user) { create :user }
  let!(:solution) { create :solution }

  context "validations" do
    it "is valid with a title and description" do
      improvement = create_improvement_with(title, description, user, solution)
      expect(solution).to be_valid
    end

    it "is invalid with an empty title" do
      improvement = create_improvement_with(nil, description, user, solution)
      expect(improvement).to have(1).errors_on(:title)
    end

    it "is invalid with a duplicate title" do
      improvement = create_improvement_with(title, description, user, solution)
      expect(Improvement.new(title: title, description: description, user: user, solution: solution)).to have(1).errors_on(:title)
    end

    it "is invalid with an empty description" do
      improvement = create_improvement_with(title, nil, user, solution)
      expect(improvement).to have(1).errors_on(:description)
    end

    it "is invalid without a user association" do
      expect(Improvement.create(title: title, description: description, user_id: nil, solution: solution)).to have(1).errors_on(:user_id)
    end

    it "is invalid without a solution association" do
      expect(Improvement.create(title: title, description: description, user: user, solution_id: nil)).to have(1).errors_on(:solution_id)
    end
  end

  def create_improvement_with(title, description, user, solution)
    Improvement.create(title: title, description: description, user_id: user.id, solution_id: solution.id)
  end
end

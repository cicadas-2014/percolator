require 'spec_helper'

feature 'User creates a new solution', type: :feature, js: true do
  let!(:problem) { create :problem }
  # let!(:solution) { create :solution }

  scenario 'with valid title and description' do
    pending("merge solutions")
    create_solution_with("Isn't my group great?", "Hell yea homie!")
  end

  scenario 'with invalid title' do
    pending("merge solutions")
    create_solution_with(nil, "Hell yea homie!")
  end

  scenario 'with invalid description' do
    pending("merge solutions")
    create_solution_with("Isn't my group great?", nil)
  end

  def create_solution_with(title, description)
    visit problem_path(problem)

    within("#new_solution") do
      fill_in 'solution_title', with: title
      fill_in 'solution_description', with: description
    end
    click_button 'Percolate'
  end
end

require 'spec_helper'

feature 'User creates a new problem', type: :feature, js: true do
  let!(:user) { create :user }
  let!(:problem) { create :problem }
  scenario 'with valid title and description' do
    create_problem_with(problem.title, problem.description)

    expect(page).to redirect_to(problem_path(problem))
  end

  scenario 'with invalid title' do
    create_problem_with(nil, problem.description)

    expect(page).to have_field("Problem Title")
  end

  scenario 'with invalid description' do
    create_problem_with(problem.title, nil)

    expect(page).to have_field("Problem Title")
  end

  def create_problem_with(title, description)
    visit root_path
    click_link 'Posit Problem'

    within("#new_problem") do
      fill_in 'Problem Title', with: title
      fill_in 'Description', with: description
    end
    click_button 'Posit'
  end
end

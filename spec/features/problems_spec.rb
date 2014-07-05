require 'spec_helper'

feature 'User creates a new problem', type: :feature, js: true do
  let!(:problem) { create :problem }

  scenario 'with valid title and description' do
    create_problem_with("holla back", "homie")
    expect(page).to have_css("div#canvas_container")
  end

  scenario 'with invalid title' do
    create_problem_with(nil, "description1")

    expect(page).to have_content("All fields must be populated!")
  end

  scenario 'with invalid description' do
    create_problem_with("title1", nil)

    expect(page).to have_content("All fields must be populated!")
  end

  def create_problem_with(title, description)
    visit new_problem_path
    within("#new_problem") do
      fill_in 'problem_title', with: title
      fill_in 'problem_description', with: description
    end
    click_button 'Posit'
  end
end

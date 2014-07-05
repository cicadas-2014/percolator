require 'spec_helper'

feature 'User creates a new problem', type: :feature, js: true do
  # # let!(:user) { create :user }
  # let!(:problem) { create :problem }
  # title = "Curbing sensationalism in the media"
  # description = "There is tendency for the press to play up and dwell on stories that
  # are sensational - murders, car crashes, kidnappings, sex scandals and the like."

  # scenario 'with valid title and description' do
  #   create_problem_with("holla back", "nigga")
  #   expect(page).to have_content("Indigo")
  # end

  # # scenario 'with invalid title' do
  # #   create_problem_with(nil, description)

  # #   expect(page).to have_content("First argument in form cannot contain nil or be empty")
  # # end

  # # scenario 'with invalid description' do
  # #   create_problem_with(title, nil)

  # #   expect(page).to have_content("First argument in form cannot contain nil or be empty")
  # # end

  # def create_problem_with(title, description)
  #   visit new_problem_path
  #   # click_link 'Posit Problem'

  #   within("#new_problem") do
  #     fill_in 'problem_title', with: title
  #     fill_in 'problem_description', with: description
  #   end
  #   click_button 'Posit'
  # end
end

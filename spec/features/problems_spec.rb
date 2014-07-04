require 'spec_helper'

# feature 'User creates a new problem', type: :feature, js: true do
#   let!(:user) { create :user }
#   let!(:problem) { create :problem }
#   scenario 'with valid title and description' do
#     p problem.title
#     create_problem_with(problem.title, problem.description)
#     p "=" * 50
#     p "=" * 50
#     p "=" * 50
#     p "=" * 50
#     expect(page).to have_content("jumanji")
#   end

#   scenario 'with invalid title' do
#     create_problem_with(nil, problem.description)

#     expect(page).to have_content("First argument in form cannot contain nil or be empty")
#   end

#   scenario 'with invalid description' do
#     create_problem_with(problem.title, nil)

#     expect(page).to have_content("First argument in form cannot contain nil or be empty")
#   end

#   def create_problem_with(title, description)
#     visit root_path
#     click_link 'Posit Problem'

#     within("#new_problem") do
#       fill_in 'problem_title', with: title
#       fill_in 'problem_description', with: description
#     end
#     sleep(2.0)
#     click_button 'Posit'
#   end
# end

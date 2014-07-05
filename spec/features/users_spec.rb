require 'spec_helper'


## some tests don't pass unless run through silenium (min 8 chars*)
## brings to old devise route
feature 'Users', type: :feature, js: true do
	scenario 'User can create a new account' do
		visit root_path
		fill_in 'sign_up_user_email', with: 'user@dbc.gov'
		fill_in 'sign_up_user_password', with: 'password'
		fill_in 'sign_up_user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(page.body).to have_content("Posit Problem")
	end

	scenario 'Password must be 8 characters or more' do
		visit root_path
		fill_in 'sign_up_user_email', with: 'user2@dbc.gov'
		fill_in 'sign_up_user_password', with: 'pass'
		fill_in 'sign_up_user_password_confirmation', with: 'pass'
		click_button 'Sign up'
		expect(page.body).to have_content("Password is too short (minimum is 8 characters)")
	end

	scenario 'User cannot create duplicate email' do
		User.create( email: 'user@dbc.gov', password: 'password')
		visit root_path
		fill_in 'sign_up_user_email', with: 'user@dbc.gov'
		fill_in 'sign_up_user_password', with: 'password'
		fill_in 'sign_up_user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(page).to have_content("Email has already been taken")
	end


	let (:user) { User.create( email: 'user@dbc.gov', password: 'password')}
	scenario 'User can login with valid information' do
		visit root_path
		fill_in 'sign_in_user_email', with: user.email
		fill_in 'sign_in_user_password', with: user.password
		click_button 'Sign in'
		expect(page.body).to have_content("Posit Problem")
	end

	scenario 'User cannot login with invalid information' do
		visit root_path
		fill_in 'sign_in_user_email', with: 'test@test.gov'
		fill_in 'sign_in_user_password', with: 'incorrect'
		click_button 'Sign in'
		expect(page.body).to have_content("Invalid User/Password")
	end
end
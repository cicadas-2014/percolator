require 'spec_helper'

feature 'Users' do
	scenario 'User can create a new account' do
		visit new_user_registration_path
		fill_in 'user_email', with: 'user@dbc.gov'
		fill_in 'user_password', with: 'password'
		fill_in 'user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(current_path).to eq(root_path)
	end

	scenario 'Password must be 8 characters or more' do
		visit new_user_registration_path
		fill_in 'user_email', with: 'user2@dbc.gov'
		fill_in 'user_password', with: 'pass'
		fill_in 'user_password_confirmation', with: 'pass'
		click_button 'Sign up'
		expect(page.body).to have_content("Password is too short (minimum is 8 characters)")
	end

	scenario 'User cannot create duplicate email' do
		User.create( email: 'user@dbc.gov', password: 'password')
		visit new_user_registration_path
		fill_in 'user_email', with: 'user@dbc.gov'
		fill_in 'user_password', with: 'password'
		fill_in 'user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(page).to have_content("Email has already been taken")
	end


	let (:user) { User.create( email: 'user@dbc.gov', password: 'password')}
	scenario 'User can login with valid information' do
		visit new_user_session_path
		fill_in 'user_email', with: user.email
		fill_in 'user_password', with: user.password
		click_button 'Sign in'
		expect(current_path).to eq(root_path)
	end

	scenario 'User cannot login with invalid information' do
		visit new_user_session_path
		fill_in 'user_email', with: 'test@test.gov'
		fill_in 'user_password', with: 'incorrect'
		click_button 'Sign in'
		expect(current_path).to eq(new_user_session_path)
	end
end
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

	let (:user) { User.create( email: 'user@dbc.gov', password: 'password')}
	scenario 'User can login with valid information' do
		visit new_user_session_path
		fill_in 'user_email', with: user.email
		fill_in 'user_password', with: user.password
		click_button 'Sign in'
		expect(current_path).to eq(root_path)
	end	
end
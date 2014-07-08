require 'spec_helper'


## some tests don't pass unless run through silenium (min 8 chars*)
## brings to old devise route
feature 'Users', type: :feature, js: true do
	scenario 'clicking the register button brings us to the register form' do
		visit root_path
		click_button 'u_button'
		expect(current_path).to eq(new_user_registration_path)
	end

	scenario 'can create a new account with valid parameters' do
		visit root_path
		click_button 'u_button'
		fill_in 'sign_up_user_email', with: 'user@dbc.gov'
		fill_in 'sign_up_user_password', with: 'password'
		fill_in 'sign_up_user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(page.body).to have_button("Posit")
	end

	scenario 'cannot create a password less than 8 characters' do
		visit root_path
		click_button 'u_button'
		fill_in 'sign_up_user_email', with: 'user2@dbc.gov'
		fill_in 'sign_up_user_password', with: 'pass'
		fill_in 'sign_up_user_password_confirmation', with: 'pass'
		click_button 'Sign up'
		expect(page.body).to have_content("Password is too short (minimum is 8 characters)")
	end

	scenario 'cannot create an account without matching password fields' do
		visit root_path
		click_button 'u_button'
		fill_in 'sign_up_user_email', with: 'user3@dbc.gov'
		fill_in 'sign_up_user_password', with: 'password'
		fill_in 'sign_up_user_password_confirmation', with: 'password1'
		click_button 'Sign up'
		expect(page.body).to have_content("Password confirmation does not match")
	end

	scenario 'cannot create a duplicate email' do
		User.create( email: 'user@dbc.gov', password: 'password')
		visit root_path
		click_button 'u_button'
		fill_in 'sign_up_user_email', with: 'user@dbc.gov'
		fill_in 'sign_up_user_password', with: 'password'
		fill_in 'sign_up_user_password_confirmation', with: 'password'
		click_button 'Sign up'
		expect(page).to have_content("Email has already been taken.")
	end

	scenario 'pressing the login button brings the login form' do
		visit root_path
		click_button 'i_button'
		expect(current_path).to eq(new_user_session_path)
	end

	let (:user) { User.create( email: 'user@dbc.gov', password: 'password')}
	scenario 'can login with valid information' do
		visit root_path
		click_button 'i_button'
		fill_in 'sign_in_user_email', with: user.email
		fill_in 'sign_in_user_password', with: user.password
		click_button 'Sign in'
		expect(page.body).to have_button("Posit")
	end

	scenario 'cannot login with invalid information' do
		visit root_path
		click_button 'i_button'
		fill_in 'sign_in_user_email', with: 'test@test.gov'
		fill_in 'sign_in_user_password', with: 'incorrect'
		click_button 'Sign in'
		expect(page.body).to have_content("Invalid email or password.")
	end
end
class UserController < Devise::RegistrationsController

	def create
		@user = User.new(user_params)
		@problems = Problem.all
		if @user.save
			sign_in(@user)
			redirect_to root_path
		else
			flash.now[:notice] = "Email has already been taken."
			render :'problems/index'
		end
	end

	def new
		@user = User.new
	end

	def user_params
		params.require(:user).permit(:email, :password, :password_confirmation)
	end
end
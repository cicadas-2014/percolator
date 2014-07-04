class UserController < ApplicationController
	before_action :authenticate_user!
	def new
		@user = current_user
	end
end
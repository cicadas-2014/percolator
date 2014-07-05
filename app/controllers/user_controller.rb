class UserController < ApplicationController

	def create
	end
	def new
		@user = User.new
	end
end
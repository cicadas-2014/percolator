class ProblemsController < ApplicationController::Base
  protect_from_forgery
  def index
    @problems = Problem.all
  end
end

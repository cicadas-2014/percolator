require 'spec_helper'

describe ProblemsController do
  let!(:fg_problem) { create :problem }
  describe "GET#index" do
    it "is successful" do
      get :index
      expect(response).to be_success
    end
    it "assigns @problems to Problem.all" do
      get :index
      expect(assigns(:problems)).to eq [fg_problem]
    end
  end

  describe "GET#show" do
    it "is successful" do
      get :show, id: fg_problem.id
      expect(response).to be_success
    end
  end

  describe "GET#new" do
    it "is successful" do
      get :new
      expect(response).to be_success
    end
  end

  describe "POST#create" do
    context "when problem is invalid" do

    end

    context "when problem is valid" do

    end

    # context "when user is found" do
    #   it "redirects to the home page upon save"
    # end
    # subject { post :create, user_id: user_id}

    # context "when user is not found" do
    #   before do
    #     expect(problem).to receive(:find).with().and_raise(ActiveRecord::RecordNotFound)
    #   end

    #   it ""
    # end
  end
end

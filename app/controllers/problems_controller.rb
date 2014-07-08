class ProblemsController < ApplicationController
  protect_from_forgery
  require 'json'
  # before_action :load_user, only: :create

  DUMMY_DATA = [
      {
          :user_id => 1,
          :title => "How does a programmer become a brogrammer?",
          :description => "I've heard a lot about brogramming. Is it a language? My desire to be a brogrammer eclipses my desire for life itself",
          :solutions => [
              {
                  :title => "Be a huge jerk who knows javascript",
                  :description => "Lots of red meat, push-ups on one hand, while coding on the other, sunglasses at all times, a tan is important, popped collar is a must. It's important that you can squash anyone who might call you 'geek' or 'nerd' and that you can pick up girls, but also equally important that you know the Star Wars movies by heart, and understand programming ideas, like recursion and inheritance.",
                  :problem_id => 1,
                  :user_id => 12,
                  :upvotes => 50,
                  :downvotes => 75,
                  :candidates => [
                  ],
                  :ancestors => [
                  ]
              },

              {
                  :title => "Be an awesome programmer who codes like a boss.",
                  :description => "Be a gentle man scholar, a lover of code, and a badass lion hunter.",
                  :problem_id => 1,
                  :user_id => 2,
                  :upvotes => 50,
                  :downvotes => 75,
                  :candidates => [
                  ],
                  :ancestors => [
                  ]

              },

              {
                  :title => "Investment banking is a better way to make money for that kind of guy.",
                  :description => "Seriously, Wolf of Wall Street. Check it out.",
                  :problem_id => 1,
                  :user_id => 3,
                  :upvotes => 50,
                  :downvotes => 75,
                  :candidates => [
                  ],
                  :ancestors => [
                  ]
              }
          ]
      },
      {
          :user_id => 2,
          :title => "Problem 2 title",
          :description => "Problem 2 description",
          :solutions => [
              {
                  :title => "Problem 2 solution 0 title",
                  :description => "Problem 2 solution 1 description",
                  :problem_id => 2,
                  :user_id => 3,
                  :upvotes => 75,
                  :downvotes => 75,
                  :candidates => [
                      {
                          :title => "Problem 2 solution 1 candidate 1 title",
                          :description => "Problem 2 solution 1 candidate 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 candidate 2 title",
                          :description => "Problem 2 solution 1 candidate 2 description",
                      }
                  ],
                  :ancestors => [
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      }

                  ]
              },
              {
                  :title => "Problem 2 solution 1 title",
                  :description => "Problem 2 solution 2 description",
                  :problem_id => 2,
                  :user_id => 3,
                  :upvotes => 75,
                  :downvotes => 75,
                  :candidates => [
                      {
                          :title => "Problem 2 solution 1 candidate 1 title",
                          :description => "Problem 2 solution 1 candidate 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 candidate 2 title",
                          :description => "Problem 2 solution 1 candidate 2 description",
                      }
                  ],
                  :ancestors => [
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      }

                  ]
              },
              {
                  :title => "Problem 2 solution 2 title",
                  :description => "Problem 2 solution 1 description",
                  :problem_id => 2,
                  :user_id => 3,
                  :upvotes => 75,
                  :downvotes => 75,
                  :candidates => [
                      {
                          :title => "Problem 2 solution 1 candidate 1 title",
                          :description => "Problem 2 solution 1 candidate 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 candidate 2 title",
                          :description => "Problem 2 solution 1 candidate 2 description",
                      }
                  ],
                  :ancestors => [
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      }

                  ]
              },
              {
                  :title => "Problem 2 solution 3 title",
                  :description => "Problem 2 solution 1 description",
                  :problem_id => 2,
                  :user_id => 3,
                  :upvotes => 75,
                  :downvotes => 75,
                  :candidates => [
                      {
                          :title => "Problem 2 solution 1 candidate 1 title",
                          :description => "Problem 2 solution 1 candidate 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 candidate 2 title",
                          :description => "Problem 2 solution 1 candidate 2 description",
                      }
                  ],
                  :ancestors => [
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      }

                  ]
              },
              {
                  :title => "Problem 2 solution 4 title",
                  :description => "Problem 2 solution 1 description",
                  :problem_id => 2,
                  :user_id => 3,
                  :upvotes => 75,
                  :downvotes => 75,
                  :candidates => [
                      {
                          :title => "Problem 2 solution 1 candidate 1 title",
                          :description => "Problem 2 solution 1 candidate 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 candidate 2 title",
                          :description => "Problem 2 solution 1 candidate 2 description",
                      }
                  ],
                  :ancestors => [
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      },
                      {
                          :title => "Problem 2 solution 1 ancestor 1 title",
                          :description => "Problem 2 solution 1 ancestor 1 description",
                      }

                  ]
              }
          ]
      }
  ]

  def index
    @problems = Problem.all
  end

  def show
    problem = Problem.find params[:id]
    @form_problem = problem
    @improvement = Improvement.new
    @solution = Solution.new
    solutions = []
    problem.solutions.each do |solution|
      solutions << {id: solution.id,
                    title: solution.title,
                    description: solution.description,
                    #username: solution.user.username
      }
    end

    @problem = {
        id: problem.id,
        title: problem.title,
        description: problem.description,
        solutions: solutions
    }.to_json.html_safe
    if (true)
      @problem = DUMMY_DATA[1].to_json.html_safe
    end
    @problem
  end

  def create
    @problem = Problem.new(problem_params)
    @problem.user_id = current_user.id
    if @problem.save
      redirect_to problem_path(@problem)
    else
      flash.now[:notice] = "All fields must be populated!"
      render :new
    end
  end

  def new
    @problem = Problem.new
  end

  private

  def problem_params
    params.require(:problem).permit(:title, :description)
  end


end

module ProblemDataFormatHelper
  def format_problem_for_client(problem)
    solutions = []
    improvements = []
    problem.solutions.each do |solution|
      solution.improvements.each do |improvement|
        improvements << {id: improvement.id,
                         title: improvement.title,
                         description: improvement.description,
                         username: improvement.user.username,
                         upvotes: improvement.voteables.where(vote_type: true).count,
                         downvotes: improvement.voteables.where(vote_type: false).count
        }
      end
      solutions << {id: solution.id,
                    title: solution.title,
                    description: solution.description,
                    username: solution.user.username,
                    improvements: improvements,
                    upvotes: solution.voteables.where(vote_type: true).count,
                    downvotes: solution.voteables.where(vote_type: false).count

      }
    end

    @problem = {
        id: problem.id,
        title: problem.title,
        description: problem.description,
        solutions: solutions,
        upvotes: problem.voteables.where(vote_type: true).count,
        downvotes: problem.voteables.where(vote_type: false).count
    }.to_json.html_safe
    @problem
  end
end

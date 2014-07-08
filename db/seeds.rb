# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
types = %w(user problem solution improvement)
usernames = %w(indigo mario simon tim berners)
count = 0

problems = [
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
                :anscestors => [
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
                :anscestors => [
                ]

            },

            {
                :title => "Investment banking is a better way to make money for that kind of guy.",
                :description => "Seriously, Wolf of Wall Street. Check it out.",
                :problem_id => 1,
                :user_id => 3,
                :upvotes => 50,
                :downvotes=> 75,
            }
        ]
    },
    {
        :user_id => 2,
        :title => "Problem 2 title",
        :description => "Problem 2 description",
        :solutions => [
            {
                :title => "Problem 2 solution 1 title",
                :description => "Problem 2 solution 1 description",
                :problem_id => 2,
                :user_id => 3,
                :upvotes => 75,
                :downvotes=> 75,
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
                :anscestors => [
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
    },
    {
        :user_id => 3,
        :title => "How does it feel to work in service capacity position where one constantly interacts with extremely wealthy?",
        :description => "For example, an air host on a private jet, a maid at a palace, etc.",
        :solutions => [
            {
                :title => "For a number of years, I worked as a wealth management advisor.",
                :description => "If you are a poor person who hates the underprivileged, your need for a paying job forces a level of decorum in your conduct, and you learn to keep quiet your most objectionable opinions so you can get along with your employers/customers.",
                :problem_id => 3,
                :user_id => 1,
                :upvotes => 50,
                :downvotes=> 75
            }
        ]
    }
]


5.times do
  User.create(username: usernames[count], email: "drknockers#{count}@pinkpanther.com", password: "deebeecee123")
  count += 1
end

problemDummyData.each do |problem|
  Problem.create(title: problem[:title], description: problem[:description], user_id: problem[:user_id])
  problem[:solutions].each do |solution|
    Solution.create(title: solution[:title], description: solution[:description], problem_id: solution[:problem_id], user_id: solution[:user_id])
  end
end

50.times do
  Improvement.create(solution_id: rand(20) + 1, problem_id: rand(10) + 1, user_id: rand(5) + 1)
end

100.times do

  case types.sample
  when "user"
    type = "user"
    count = 5
  when "problem"
    type = "problem"
    count = 10
  when "solution"
    type = "solution"
    count = 20
  when "improvement"
    type = "improvement"
    count = 50
  end

  Vote.create(voteable_type: type, voteable_id: rand(count) + 1, user_id: rand(5) + 1, vote_type: true)
end

types.delete("user")
300.times do

  case types.sample
  when "problem"
    type = "problem"
    count = 10
  when "solution"
    type = "solution"
    count = 20
  when "improvement"
    type = "improvement"
    count = 50
  end

  Comment.create(description: Faker::Lorem.paragraph(8), username: Faker::Lorem.word, commentable_type: type, commentable_id: rand(count) + 1)
end

# latest transcript

# income transcript

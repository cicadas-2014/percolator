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
                :title => "Be a huge douche who knows javascript",
                :description => "Lots of red meat, push-ups on one hand, while coding on the other, sunglasses at all times, a tan is important, popped collar is a must. It's important that you can squash anyone who might call you 'geek' or 'nerd' and that you can pick up girls, but also equally important that you know the Star Wars movies by heart, and understand programming ideas, like recursion and inheritance.",
                :problem_id => 1,
                :user_id => 5,
                :upvotes => 50,
                :downvotes=> 75
            }
        ]
    },
    {
        :user_id => 2,
        :title => "What's my social status? Should I date up or down?",
        :description => "I see many references to one's social status, such as 'date up' and 'marry up', etc. So, what's my social status? I'm 33, white, single, healthy, I have a degree in CS and make $110K/yr.",
        :solutions => [
            {
                :title => "Don't fall in love wth status",
                :description => "The day I married my husband he had literally a dollar to his name, no car, no high school diploma, at the time no job and he had just gotten sober a few months before. Everyone I knew told me I was an idiot.",
                :problem_id => 2,
                :user_id => 3,
                :upvotes => 50,
                :downvotes=> 75
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
                :description => "If you are a poor person who hates gay people/broken-English-speaking immigrants/Republicans/whatever, your need for a paying job forces a level of decorum in your conduct, and you learn to keep quiet your most objectionable opinions so you can get along with your employers/customers.",
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

2.times do |count|
  p problems[count][:title]
  Problem.create(title: problems[count][:title], description: problems[count][:description], user_id: problems[count][:user_id])
end

20.times do
  Solution.create(title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(10), problem_id: rand(10) + 1, user_id: rand(5) + 1)
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

# latest transcript

# income transcript

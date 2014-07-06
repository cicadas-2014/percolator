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
5.times do
  User.create(username: usernames[count], email: "drknockers#{count}@pinkpanther.com", password: "deebeecee123")
  count += 1
end

10.times do
  Problem.create(title: Faker::Lorem.sentence, description: Faker::Lorem.paragraph(10), user_id: rand(5) + 1)
end

20.times do
  Solution.create(problem_id: rand(10) + 1, user_id: rand(5) + 1)
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

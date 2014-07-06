FactoryGirl.define do
  factory :user do
    username { Faker::Internet.domain_word }
    password { Faker::Internet.password(10) }
    email { Faker::Internet.email }
    reputation { rand(1000) }
  end

  factory :problem do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    association :user
  end

  factory :solution do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    association :user
    association :problem
  end

  factory :improvement do
    title { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    association :user
    association :solution
  end

  factory :votes do
    association :user
    association :voteable
  end
end

FactoryBot.define do
  
  factory :message do
    content {Faker::Beer.brand}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
  end

end
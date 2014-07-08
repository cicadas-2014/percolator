Rails.application.routes.draw do
  resources :problems, only: [:new, :create, :show] do
    post '/solutions/create', to: 'solutions#create'
  end

  resources :solutions, only: [] do
    post '/improvements/create', to: 'improvements#create'
  end

  devise_for :users, controllers: { registrations: 'user'}

  root to: 'problems#index'

  post '/solution_upvote', to: "votes#solution_upvote"
  post '/solution_downvote', to: "votes#solution_downvote"
  post '/problem_upvote', to: "votes#problem_upvote"
  post '/problem_downvote', to: "votes#problem_downvote"

  get '/problems/comments/:problem_id', to: "comments#problem_comments"
  get '/solutions/comments/:solution_id', to: "comments#solution_comments"
  get '/improvements/comments/:improvement_id', to: "comments#improvement_comments"
  post '/problems/comments/:problem_id/create', to: "comments#create", as: "new_problems_comment"
  # post '/problems/comments/:problem_id/create', to: "comments#problem_create", as: "new_problems_comment_reply"
  post '/solutions/comments/:solution_id/create', to: "comments#create", as: "new_solutions_comment"
  # post '/problems/solutions/:problem_id/create', to: "comments#solution_create", as: "new_solutions_comment_reply"
  post '/improvements/comments/:improvement_id/create', to: "comments#create", as: "new_improvements_comment"
  # post '/problems/improvements/:problem_id/create', to: "comments#improvement_create", as: "new_problems_comment_reply"

  # post '/improvements', to: 'improvements#send'

  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end

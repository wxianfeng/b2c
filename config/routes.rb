Shopdls::Application.routes.draw do  

  resources :uploads  
  resources :items
  resources :offers
  resources :orders
  resources :item_questions
  
  devise_for :users,
    :controllers => {:omniauth_callbacks => 'omniauth_callbacks'}

  as :user do
    get 'login', :to => 'devise/sessions#new', :as => 'new_user_session'
    get 'logout', :to => 'devise/sessions#destroy', :as => 'destroy_user_session'
    get 'signup', :to => 'devise/registrations#new', :as => 'new_user_registration'
  end
  
  namespace :my do
    resources :products
    resources :product_imports
  end
  
  namespace :admin do
    root :to => 'colors#index'
    resources :colors
    resources :categories do
      collection {
        # post :get_category
          get  :get_category
      }
    end
  end
  
  root :to => 'home#index'
  
end

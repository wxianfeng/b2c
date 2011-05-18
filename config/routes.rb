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

  root :to => 'dashboard#index'
  
  namespace :my do
    resources :products
  end
  
  namespace :admin do
    resources :categories do
      collection {
        post :get_category
      }
    end
  end
end

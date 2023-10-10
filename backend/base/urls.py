from django.urls import path
from . import views

urlpatterns = [

    path('',views.getRoutes,name="routes"),
    path('products/',views.getProducts,name="routes"),
    path('products/<str:pk>/',views.getProduct,name="routes"),
    path('register', views.UserRegister.as_view(), name='register'),
	path('login', views.UserLogin.as_view(), name='login'),
	path('logout', views.UserLogout.as_view(), name='logout'),
	path('user', views.UserView.as_view(), name='user'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('remove_from_cart/', views.remove_from_cart, name='remove_from_cart'),
    path('view_cart/', views.view_cart, name='view_cart'),
]
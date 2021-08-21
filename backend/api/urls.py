from django.contrib import admin
from django.urls import path,include
from .views import *

urlpatterns = [
    path('login/', LoginView.as_view(),name="login"),
    path('register/', RegisterView.as_view(),name="register"),
    path('getallproduct/', GetallproductView.as_view(),name="getallproduct"),
    path('getproduct/',ProductView.as_view(),name="product"),
    path('addtocart/',AddtocartView.as_view(),name="cart"),
    path('removetocart/',RemovetocartView.as_view(),name="remove-cart"),
    path('usercartlist/',UsercartlistView.as_view(),name="cart-list"),
    path('getuser/',GetuserView.as_view(),name="user"),
    path('deletecartitem/',DeletecartitemView.as_view(),name="deletecartitem"),
]

from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import ListUserAdmin, user_api_del


urlpatterns = [
    re_path(r'', include('djoser.urls')),
    re_path(r'', include('djoser.urls.authtoken')),
    path('user/list/', ListUserAdmin.as_view(), name='list-user'),
    path('user/del/', user_api_del, name='del-user'),
]
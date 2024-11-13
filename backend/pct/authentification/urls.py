from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import ListUserAdmin, user_api_del, ListUserFilterOrg, ListUserFilterEmail


urlpatterns = [
    re_path(r'', include('djoser.urls')),
    re_path(r'', include('djoser.urls.authtoken')),
    path('user/list/', ListUserAdmin.as_view(), name='list-user'),
    path('user/del/', user_api_del, name='del-user'),
    path('user/filter/org/', ListUserFilterOrg.as_view(), name='filter-org'),
    path('user/filter/email/', ListUserFilterEmail.as_view(), name='filter-email'),
]
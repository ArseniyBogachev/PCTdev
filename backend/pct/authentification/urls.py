from django.urls import path, include, re_path
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import ListUserAdmin, user_api_del


# router = SimpleRouter()
# router.register(r'admin', Admin, basename='crud')

urlpatterns = [
    re_path(r'', include('djoser.urls')),
    re_path(r'', include('djoser.urls.authtoken')),
    path('user/list/', ListUserAdmin.as_view(), name='list-user'),
    path('user/del/', user_api_del, name='del-user'),

    # path('', include(router.urls)),
    # path('user/crud/<int:id>', User.as_view({'get': 'retrieve', 'put': 'update'}), name='user'),

    # path('admin/crud/', Admin.as_view({'get': 'list', 'post': 'create'}), name='admin'),
    # path('admin/crud/<int:id>', Admin.as_view({'put': 'update', 'detete': 'destroy'}), name='admin-detail'),
]
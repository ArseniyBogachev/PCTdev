from django.urls import path, include
from rest_framework.routers import DefaultRouter, SimpleRouter
from .views import login, register, Admin, User


router = SimpleRouter()
router.register(r'admin', Admin, basename='crud')

urlpatterns = [
    path('login/', login, name='login'),
    path('register/', register, name='register'),
    path('', include(router.urls)),
    path('user/crud/<int:id>', User.as_view({'get': 'retrieve', 'put': 'update'}), name='user'),

    # path('admin/crud/', Admin.as_view({'get': 'list', 'post': 'create'}), name='admin'),
    # path('admin/crud/<int:id>', Admin.as_view({'put': 'update', 'detete': 'destroy'}), name='admin-detail'),
]
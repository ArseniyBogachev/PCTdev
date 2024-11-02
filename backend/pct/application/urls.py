from django.urls import path, include, re_path
from .views import FactoryApiCL


urlpatterns = [
    path('factory/', FactoryApiCL.as_view(), name='factoryCL'),
]
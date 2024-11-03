from django.urls import path, include, re_path
from .views import FactoryApiCL, factory_api_del, ProductApiCL


urlpatterns = [
    path('factory/', FactoryApiCL.as_view(), name='factoryCL'),
    path('factory/del/', factory_api_del, name='factoryD'),
    path('product/', ProductApiCL.as_view(), name='productCL'),
]
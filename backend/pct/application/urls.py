from django.urls import path, include, re_path
from .views import (
    FactoryApiCL, 
    factory_api_del, 
    ProductApiCL, 
    product_api_del, 
    OrderApiCL,
    OrderApiU,
    order_api_del,
    all_product_and_factory,
    QuantityProductApiC
)


urlpatterns = [
    path('factory/', FactoryApiCL.as_view(), name='factoryCL'),
    path('factory/del/', factory_api_del, name='factoryD'),
    path('product/', ProductApiCL.as_view(), name='productCL'),
    path('product/del/', product_api_del, name='productD'),
    path('order/', OrderApiCL.as_view(), name='orderCD'),
    path('order/del/', order_api_del, name='orderD'),
    path('order/update/<int:pk>', OrderApiU.as_view(), name='orderU'),
    path('quantity_product/create/', QuantityProductApiC.as_view(), name='quantity-productC'),
    path('factory_product/list/', all_product_and_factory, name='factory-productL'),
]
import json
from rest_framework.generics import ListCreateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .models import Factory, Product, Order, QuantityProduct
from .serializers import (
    CreateFactorySerializerAdmin,  
    ListFactorySerializerUser, 
    ListFactorySerializerAdmin, 
    ProductSerializer,
    ListOrderSerializerAdmin,
    ListOrderSerializerUser,
    CreateOrderSerializer,
    QuantityProductSerializer
)
from .paginations import DefaultPagination
from authentification.permissions import IsAdmin


class FactoryApiCL(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['id', 'name', 'phone']
    ordering_fields = ['id']

    def get_serializer_class(self):
        if self.request.method == 'GET':
            if self.request.user.is_superuser == True:
                return ListFactorySerializerAdmin
            return ListFactorySerializerUser
        else:
            return CreateFactorySerializerAdmin
        
    def get_queryset(self):
        if self.request.user.is_superuser == True:
            return Factory.objects.all()
        return Factory.objects.filter(owner=self.request.user.id)


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def factory_api_del(request):
    factory = Factory.objects.filter(id__in=request.data['id']).delete()

    if factory:
        return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)


class ProductApiCL(ListCreateAPIView):
    queryset = Product.objects.all()
    permission_classes = (IsAuthenticated, IsAdmin)
    pagination_class = DefaultPagination
    serializer_class = ProductSerializer


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdmin])
def product_api_del(request):
    product = Product.objects.filter(id__in=request.data['id']).delete()

    if product:
        return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)


class OrderApiCL(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = DefaultPagination

    def get_queryset(self):
        if self.request.user.is_superuser == True:
            return Order.objects.all()
        return Order.objects.filter(customer=self.request.user.id)

    def get_serializer_class(self):
        if self.request.method == 'GET':
            if self.request.user.is_superuser == True:
                return ListOrderSerializerAdmin
            return ListOrderSerializerUser
        
    def create(self, request, *args, **kwargs):
        srlz = CreateOrderSerializer(data={
            'customer': request.user.id, 
            'xml': request.data['xml'],
            'factory': request.data['factory'],
        })
        srlz.is_valid(raise_exception=True)
        srlz.save()

        return Response(srlz.data)
    

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def order_api_del(request):
    product = Order.objects.filter(id__in=request.data['id']).delete()

    if product:
        return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)
    

class QuantityProductApiC(CreateAPIView):
    queryset = QuantityProduct.objects.all()
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        data = [{
            'product': item['product'],
            'order': request.data['order'],
            'quantity': item['quantity']
        } for item in request.data['quantity_product']]

        srlz = QuantityProductSerializer(data=data, many=True)
        srlz.is_valid(raise_exception=True)
        srlz.save()

        return Response(srlz.data)

        

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def all_product_and_factory(request):
    product = Product.objects.all().values('id', 'name')

    if request.user.is_superuser == True:
        factory = Factory.objects.all().values('id', 'name')
    else:
        factory = Factory.objects.filter(owner=request.user.id).values('id', 'name')

    return Response({
        'product': product,
        'factory': factory
    })

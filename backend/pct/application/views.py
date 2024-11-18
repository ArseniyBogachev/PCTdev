import re
from datetime import datetime
from rest_framework.generics import ListCreateAPIView, CreateAPIView, UpdateAPIView, ListAPIView
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
    ListProductSerializer,
    UpdateProductSerializer,
    ListOrderSerializerAdmin,
    ListOrderSerializerUser,
    CreateOrderSerializer,
    UpdateOrderSerializer,
    QuantityProductSerializer,
    FactoryFilter
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
            return Factory.objects.all().order_by('-id')
        return Factory.objects.filter(owner=self.request.user.id).order_by('-id')


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def factory_api_del(request):
    if request.data['id']:
        factory = Factory.objects.filter(id__in=request.data['id']).delete()

        if factory[0]:
            return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)


class ProductApiCL(ListCreateAPIView):
    queryset = Product.objects.all().order_by('-id')
    permission_classes = (IsAuthenticated, IsAdmin)
    pagination_class = DefaultPagination
    serializer_class = ListProductSerializer


class ProductApiU(UpdateAPIView):
    queryset = Product.objects.all()
    serializer_class = UpdateProductSerializer
    permission_classes = (IsAuthenticated, IsAdmin)
    
    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)
        
        if not pk:
            return Response({'message': 'ID not listed in URL'}, status=404)
        
        try:
            instance = Product.objects.get(pk=pk)
        except:
            return Response({'message': 'ID not found'}, status=404)
        
        srlz = UpdateProductSerializer(data=request.data, instance=instance)
        srlz.is_valid(raise_exception=True)
        srlz.save()
        return Response({'message': 'OK'})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdmin])
def product_api_del(request):
    if request.data['id']:
        product = Product.objects.filter(id__in=request.data['id']).delete()

        if product[0]:
            return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)


class OrderApiCL(ListCreateAPIView):
    permission_classes = (IsAuthenticated,)
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['id', 'customer', 'factory__name', 'status']
    ordering_fields = ['id', 'factory', 'status']

    def get_queryset(self):
        if self.request.user.is_superuser == True:
            return Order.objects.all().order_by('-id')
        return Order.objects.filter(customer=self.request.user.id).order_by('-id')

    def get_serializer_class(self):
        if self.request.method == 'GET':
            if self.request.user.is_superuser == True:
                return ListOrderSerializerAdmin
            return ListOrderSerializerUser
        
    def create(self, request, *args, **kwargs):
        if not request.data['hasUndefinedFromQP']:
            srlz = CreateOrderSerializer(data={
                'customer': request.user.id, 
                'xml': request.data['xml'],
                'factory': request.data['factory'],
            })
            srlz.is_valid(raise_exception=True)
            srlz.save()

            return Response(srlz.data)
        return Response({'message': 'Обнаружены пустые поля'}, status=400)


class OrderApiU(UpdateAPIView):
    permission_classes = (IsAuthenticated, IsAdmin)
    
    def put(self, request, *args, **kwargs):
        pk = kwargs.get('pk', None)

        if not pk:
            return Response({'message': 'ID not listed in URL'}, status=404)

        if request.data.get('shipping_date', False):
            request.data['shipping_date'] = f'{request.data['shipping_date']}'

        if request.data.get('accepted_factory', False):
            request.data['accepted_factory'] = f'{request.data['accepted_factory']}'
        
        try:
            instance = Order.objects.get(pk=pk)
        except:
            return Response({'message': 'ID not found'}, status=404)
        
        srlz = UpdateOrderSerializer(data=request.data, instance=instance)
        srlz.is_valid(raise_exception=True)
        srlz.save()
        return Response({'message': 'OK'})


@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def order_api_del(request):
    if request.data['id']:
        product = Order.objects.filter(id__in=request.data['id']).delete()

        if product[0]:
            return Response({'message': 'Factories were successfully deleted'})
    return Response({'message': 'Factories not found'}, status=404)
    

class QuantityProductApiC(CreateAPIView):
    queryset = QuantityProduct.objects.all().order_by('-id')
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
    product = Product.objects.filter(status=True).values('id', 'name')

    if request.user.is_superuser == True:
        factory = Factory.objects.all().values('id', 'name')
    else:
        factory = Factory.objects.filter(owner=request.user.id).values('id', 'name')

    return Response({
        'product': product,
        'factory': factory
    })


class FactoryFilterL(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = FactoryFilter

    def get_queryset(self):
        if self.request.user.is_superuser == True:
            return Factory.objects.values('name').distinct()
        return Factory.objects.filter(owner=self.request.user.id).values('name').distinct()

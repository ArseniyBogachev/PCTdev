from rest_framework.serializers import ModelSerializer, IntegerField
from .models import Factory, Product, Order


class CreateFactorySerializerAdmin(ModelSerializer):

    class Meta:
        model = Factory
        fields = '__all__'


class CreateFactorySerializerUser(ModelSerializer):

    class Meta:
        model = Factory
        fields = ['id', 'name', 'phone', 'email', 'fio', 'registration_number']


class ListFactorySerializerAdmin(ModelSerializer):

    class Meta:
        model = Factory
        fields = ['id', 'name', 'phone', 'email', 'fio', 'registration_number', 'company', 'phone_company']


class ListFactorySerializerUser(ModelSerializer):

    class Meta:
        model = Factory
        fields = ['id', 'name', 'phone', 'email', 'fio', 'registration_number']


class ProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'


class ListOrderSerializerAdmin(ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'status', 'receiving_order', 'shipping_date', 'accepted_factory', 'xml', 'quantity_product']


class ListOrderSerializerUser(ModelSerializer):

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'status', 'creator_at', 'last_update', 'company']


class CreateOrderSerializer(ModelSerializer):
    quantity = IntegerField()

    class Meta:
        model = Order
        fields = ['xml', 'factory', 'customer', 'quantity_product', 'quantity']

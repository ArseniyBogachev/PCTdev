from rest_framework.serializers import ModelSerializer, IntegerField, SerializerMethodField, DateTimeField
from .serializer_fields import BinaryField
from .models import Factory, Product, Order, QuantityProduct
from datetime import datetime
from django.utils import timezone


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


class ListProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
    

class UpdateProductSerializer(ModelSerializer):

    class Meta:
        model = Product
        fields = ['status']

    def update(self, instance, validated_data):
        print(validated_data)
        instance.status = validated_data.get('status', instance.status)
        instance.save()
        return instance


class ListOrderSerializerAdmin(ModelSerializer):

    status = SerializerMethodField()
    xml = BinaryField()
    quantity_product = SerializerMethodField()
    customer = SerializerMethodField()
    factory = SerializerMethodField()
    email_customer = SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'email_customer', 'factory', 'status', 'receiving_order', 'shipping_date', 'accepted_factory', 'xml', 'quantity_product']

    def get_status(self, instance):
        stts_values = list(instance.STATUS_ORDER.values())
        return {
            'current': instance.status,
            'choice': [{'id': index, 'name': stts_values[index]} for index in range(len(stts_values))]
        }
    
    def get_factory(self, instance):
        return instance.factory.name
    
    def get_customer(self, instance):
        return instance.customer.organization
    
    def get_email_customer(self, instance):
        return instance.customer.email
    
    def get_quantity_product(self, instance):
        query = QuantityProduct.objects.filter(product__in=instance.quantity_product.all(), order=instance.id)
        return [{
            'product': item.product.name,
            'quantity': item.quantity
        } for item in query]


class ListOrderSerializerUser(ModelSerializer):

    status = SerializerMethodField()
    factory = SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'factory', 'status', 'creator_at', 'last_update', 'shipping_date', 'accepted_factory']

    def get_status(self, obj):
        return obj.get_status_display()
        
    def get_factory(self, instance):
        return instance.factory.name


class CreateOrderSerializer(ModelSerializer):

    xml = BinaryField()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'xml']

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    

class UpdateOrderSerializer(ModelSerializer):

    shipping_date = DateTimeField(required=False)
    accepted_factory = DateTimeField(required=False)

    class Meta:
        model = Order
        fields = ['status', 'shipping_date', 'accepted_factory', 'customer']

    def update(self, instance, validated_data):
        instance.status = validated_data.get('status', instance.status)
        instance.shipping_date = validated_data.get('shipping_date', instance.shipping_date)
        instance.accepted_factory = validated_data.get('accepted_factory', instance.accepted_factory)
        instance.save()
        return instance
    

class QuantityProductSerializer(ModelSerializer):

    class Meta:
        model = QuantityProduct
        fields = '__all__'

    def create(self, validated_data):
        return QuantityProduct.objects.create(**validated_data)
    

class FactoryFilter(ModelSerializer):

    class Meta:
        model = Factory
        fields = ['name']
    
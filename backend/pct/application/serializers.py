from rest_framework.serializers import ModelSerializer, IntegerField, SerializerMethodField
from .serializer_fields import BinaryField
from .models import Factory, Product, Order, QuantityProduct


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

    status = SerializerMethodField()
    xml = BinaryField()
    quantity_product = SerializerMethodField()
    customer = SerializerMethodField()
    factory = SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'status', 'receiving_order', 'shipping_date', 'accepted_factory', 'xml', 'quantity_product']

    def get_status(self, obj):
        return obj.get_status_display()
    
    def get_factory(self, instance):
        return instance.factory.name
    
    def get_customer(self, instance):
        return instance.customer.organization
    
    def get_quantity_product(self, instance):
        return [{
            'product': item.name,
            'order': instance.id
        } for item in instance.quantity_product.all()]


class ListOrderSerializerUser(ModelSerializer):

    status = SerializerMethodField()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'status', 'creator_at', 'last_update', 'company']

    def get_status(self,obj):
        return obj.get_status_display()


class CreateOrderSerializer(ModelSerializer):

    xml = BinaryField()

    class Meta:
        model = Order
        fields = ['id', 'customer', 'factory', 'xml']

    def create(self, validated_data):
        return Order.objects.create(**validated_data)
    

class QuantityProductSerializer(ModelSerializer):

    class Meta:
        model = QuantityProduct
        fields = '__all__'

    def create(self, validated_data):
        return QuantityProduct.objects.create(**validated_data)
    
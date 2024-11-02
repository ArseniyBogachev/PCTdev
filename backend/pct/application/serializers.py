from rest_framework.serializers import ModelSerializer
from .models import Factory


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

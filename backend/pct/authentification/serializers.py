from rest_framework.serializers import ModelSerializer, SerializerMethodField
from .models import User
from application.models import Factory
from application.serializers import ListFactorySerializerUser


class AuthSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'fio', 'id', 'inn', 'is_staff', 'is_superuser', 'organization', 'phone']


class AdminUserSerializer(ModelSerializer):
    # owner = SerializerMethodField()

    class Meta:
        model = User
        fields = ['id', 'organization', 'email', 'phone', 'fio', 'inn', ]

    # def get_owner(self, instance):
    #     return Factory.objects.filter(owner=instance.id).values('name')
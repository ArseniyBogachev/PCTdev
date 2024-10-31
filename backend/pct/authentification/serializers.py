from rest_framework.serializers import ModelSerializer
from .models import User


class AuthSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['email', 'fio', 'id', 'inn', 'is_staff', 'is_superuser', 'organization', 'phone']


class AdminUserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

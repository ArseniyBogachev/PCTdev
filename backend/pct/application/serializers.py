from rest_framework.serializers import ModelSerializer
from .models import Factory


class FactorySerializer(ModelSerializer):

    class Meta:
        model = Factory
        fields = '__all__'

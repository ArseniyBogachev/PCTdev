from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from .models import Factory
from .serializers import FactorySerializer


class FactoryApiCL(ListCreateAPIView):
    serializer_class = FactorySerializer
    queryset = Factory.objects.all()
    permission_classes = (IsAuthenticated,)

from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Factory, Product
from .serializers import (
    CreateFactorySerializerAdmin, 
    CreateFactorySerializerUser, 
    ListFactorySerializerUser, 
    ListFactorySerializerAdmin, 
    ProductSerializer
)
from .paginations import DefaultPagination
from authentification.permissions import IsAdmin


class FactoryApiCL(ListCreateAPIView):
    queryset = Factory.objects.all()
    permission_classes = (IsAuthenticated,)
    pagination_class = DefaultPagination

    def get_serializer_class(self):
        if self.request.method == 'GET':
            if self.request.user.is_superuser == True:
                return ListFactorySerializerAdmin
            return ListFactorySerializerUser
        else:
            if self.request.user.is_superuser == True:
                return CreateFactorySerializerAdmin
            return CreateFactorySerializerUser


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

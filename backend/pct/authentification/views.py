import requests
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from .serializers import AdminUserSerializer, AuthSerializer, AdminUserSerializer
from .models import User as UserModel
from .permissions import IsAdmin
from application.paginations import DefaultPagination



# generics.RetrieveUpdateAPIView !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


# class Admin(ModelViewSet):
#     queryset = UserModel.objects.all()
#     serializer_class = AdminUserSerializer


# class User(ModelViewSet):
#     queryset = UserModel.objects.all()
#     serializer_class = AuthSerializer


class ListUserAdmin(ListAPIView):
    queryset = UserModel.objects.filter(is_superuser=False)
    permission_classes = (IsAuthenticated, IsAdmin)
    serializer_class = AdminUserSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['organization', 'email']


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdmin])
def user_api_del(request):
    print(request.data['id'])

    # if factory:
    return Response({'message': 'User were successfully deleted'})
    # return Response({'message': 'Factories not found'}, status=404)


@api_view(['GET'])
def activate(request, uid, token, format=None):
    payload = {'uid': uid, 'token': token}

    url = "http://127.0.0.1:8000/api/v1/auth/users/activation/"
    response = requests.post(url, data=payload)

    if response.status_code == 204:
        return Response({}, response.status_code)
    else:
        print('else')
        return Response(response.json())

































# @api_view(['POST'])
# def register(request):
#     count = len(UserModel.objects.all())

#     user = UserModel.objects.create_user(
#         email=request.data['email'],
#         password=request.data['password'],
#         phone=request.data['phone'],
#         fio=request.data['fio'],
#         inn=request.data['inn'],
#         organization=request.data['organization'],
#         is_active=False,
#         is_superuser=True if count < 2 else False,
#         is_staff=True if count < 2 else False
#     )
#     user.save()

#     return Response({'message': 'User created'})


# @api_view(['POST'])
# def login(request):
#     user = AuthenticationBackend().authenticate(
#         request, 
#         email=request.data['email'], 
#         password=request.data['password']
#     )

#     if user is not None:
#         return Response(AuthSerializer(user).data)
#     else:
#         return Response({'message': 'Data is incorrect'}, status=403)
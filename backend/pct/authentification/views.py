import requests
from rest_framework.generics import ListAPIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view, permission_classes, action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from django.http import HttpResponseRedirect
from .serializers import AdminUserSerializer, AdminUserSerializer, UserFilterOrgSerializer, UserFilterEmailSerializer
from .models import User as UserModel
from .permissions import IsAdmin
from application.paginations import DefaultPagination
from pct.env import FRONTEND_IP_PORT, BACKEND_IP_PORT


class ListUserAdmin(ListAPIView):
    queryset = UserModel.objects.filter(is_superuser=False)
    permission_classes = (IsAuthenticated, IsAdmin)
    serializer_class = AdminUserSerializer
    pagination_class = DefaultPagination
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['organization', 'email']


class ListUserFilterOrg(ListAPIView):
    queryset = UserModel.objects.filter(is_superuser=False).values('organization').distinct()
    permission_classes = (IsAuthenticated, IsAdmin)
    serializer_class = UserFilterOrgSerializer


class ListUserFilterEmail(ListAPIView):
    queryset = UserModel.objects.filter(is_superuser=False).values('email').distinct()
    permission_classes = (IsAuthenticated, IsAdmin)
    serializer_class = UserFilterEmailSerializer


@api_view(["DELETE"])
@permission_classes([IsAuthenticated, IsAdmin])
def user_api_del(request):
    if request.data['id']:
        user = UserModel.objects.filter(id__in=request.data['id']).delete()

        if user[0]:
            return Response({'message': 'User were successfully deleted'})
    return Response({'message': 'User not found'}, status=404)


@api_view(['GET'])
def activate(request, uid, token, format=None):
    payload = {'uid': uid, 'token': token}

    url = f"http://{BACKEND_IP_PORT}/api/v1/auth/users/activation/"
    response = requests.post(url, data=payload)

    if response.status_code == 204:
        return Response({'message': 'OK'}, response.status_code)
    else:
        return Response({'message': 'Error activated'})
    

@api_view(['GET'])
def reset_password(request, uid, token, format=None):
    return HttpResponseRedirect(f'http://{FRONTEND_IP_PORT}/new/password/{uid}/{token}/')
























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
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import AuthenticationBackend
from .serializers import AdminUserSerializer, AuthSerializer
from .models import User


class Admin(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AdminUserSerializer


class User(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = AuthSerializer


@api_view(['POST'])
def login(request):
    user = AuthenticationBackend().authenticate(
        request, 
        email=request.data['email'], 
        password=request.data['password']
    )

    if user is not None:
        return Response(AuthSerializer(user).data)
    else:
        return Response({'message': 'Data is incorrect'}, status=403)
        
@api_view(['POST'])
def register(request):
    count = len(User.objects.all())

    user = User.objects.create_user(
        email=request.data['email'],
        password=request.data['password'],
        phone=request.data['phone'],
        fio=request.data['fio'],
        inn=request.data['inn'],
        organization=request.data['organization'],
        is_active=False,
        is_superuser=True if count < 2 else False,
        is_staff=True if count < 2 else False
    )
    user.save()

    return Response({'message': 'User created'})

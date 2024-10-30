from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import User


class Login(APIView):

    def post(self, request):
        print('POST -> ', request.data)
        
        return Response({'message': 'User created.'})
    

class Register(APIView):

    def post(self, request):

        user = User.objects.create_user(
            email=request.data['email'],
            password=request.data['password'],
            phone=request.data['phone'],
            fio=request.data['fio'],
            inn=request.data['inn'],
            organization=request.data['organization'],
            is_active=False
        )
        user.save()

        return Response({'message': 'User created'})

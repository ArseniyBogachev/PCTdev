from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response


class Test(APIView):

    def get(self, request, format=None):
        content = {'user_count': 2}
        return Response(content)
# Create your views here.

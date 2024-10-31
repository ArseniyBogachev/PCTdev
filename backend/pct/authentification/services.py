from django.contrib.auth.backends import BaseBackend
from .models import User


class AuthenticationBackend(BaseBackend):

    def authenticate(self, request, email=None, password=None):
        
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        
        if user is not None and user.check_password(password):
            return user
        return None

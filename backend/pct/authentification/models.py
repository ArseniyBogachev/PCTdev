from django.db import models
from django.contrib.auth.models import AbstractUser
from .manager import UserManager


class User(AbstractUser):
    username = None
    first_name = None
    last_name = None
    last_login = None
    phone = models.CharField(max_length=100)
    fio = models.CharField(max_length=100)
    organization = models.CharField(max_length=100)
    inn = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    EMAIL_FIELD = 'email'
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['phone', 'fio', 'organization', 'inn']

    objects = UserManager()

    def __str__(self):
        return self.email

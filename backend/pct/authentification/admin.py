from django.contrib import admin
from .models import *


class AdminUser(admin.ModelAdmin):
    list_display = ('id', 'email', 'password', 'fio')

admin.site.register(User, AdminUser)

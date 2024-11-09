from django.contrib import admin
from django.urls import path, include, re_path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from authentification.views import activate, reset_password


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/docs/', SpectacularSwaggerView.as_view(url_name='schema'), name='docs'), 
    path("api/v1/auth/", include('authentification.urls')),
    path("api/v1/app/", include('application.urls')),
    re_path(r'activate/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', activate, name='activation'),
    re_path(r'password/reset/confirm/(?P<uid>[\w-]+)/(?P<token>[\w-]+)/$', reset_password, name='reset-password'),
]

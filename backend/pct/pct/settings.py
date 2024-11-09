
from pathlib import Path
from .env import *

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = SRV_SECRET_KEY

DEBUG = True

ALLOWED_HOSTS = ["127.0.0.1"]

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'authentification.apps.AuthentificationConfig',
    'application.apps.ApplicationConfig',
    'rest_framework',
    'corsheaders',
    'django_filters',
    'drf_spectacular', 
    'rest_framework.authtoken',
    'djoser'
]

CORS_ORIGIN_ALLOW_ALL=True

CORS_ORIGIN_WHITELIST = ["http://localhost:3000"]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'pct.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

REST_FRAMEWORK = {
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
        'rest_framework.authentication.BasicAuthentication',
    ],
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema', 
}

WSGI_APPLICATION = 'pct.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': "PCT",
        'USER': "postgres",
        'PASSWORD': "Danny100",
        'HOST': "postgres",
        # 'HOST': "localhost",
        'PORT': "5432"
    }
}

AUTH_USER_MODEL = "authentification.User"

# smtp
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST_USER = SMTP_EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = SMTP_EMAIL_HOST_PASSWORD
EMAIL_HOST = "smtp.gmail.com"
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DJOSER = {
    'DOMAIN': "localhost:8000",
    'SITE_NAME': 'PCT',
    'PASSWORD_RESET_CONFIRM_URL': "password/reset/confirm/{uid}/{token}",
    'USERNAME_RESET_CONFIRM_URL': "#/username/reset/confirm/{uid}/{token}",
    'ACTIVATION_URL': "activate/{uid}/{token}",
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user': 'authentification.serializers.AuthSerializer',
        'current_user': 'authentification.serializers.AuthSerializer',
    },
}

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True

STATIC_URL = 'static/'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

"""
Django settings for pct project.

Generated by 'django-admin startproject' using Django 5.1.1.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/5.1/ref/settings/
"""

from pathlib import Path
from .env import *

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = SRV_SECRET_KEY

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [SRV_HOST]


# Application definition

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

CORS_ORIGIN_WHITELIST = [SRV_CORS_ORIGIN_WHITELIST]

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
        # 'NAME': DB_NAME,
        # 'USER': DB_USER,
        # 'PASSWORD': DB_PASSWORD,
        # 'HOST': DB_HOST,
        # 'PORT': DB_PORT
        'NAME': "PCT",
        'USER': "postgres",
        'PASSWORD': "Danny100",
        'HOST': "db",
        'PORT': "5432"
    }
}

AUTH_USER_MODEL = "authentification.User"

# smtp
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST_USER = SMTP_EMAIL_HOST_USER
EMAIL_HOST_PASSWORD = SMTP_EMAIL_HOST_PASSWORD
EMAIL_HOST = SMTP_EMAIL_HOST
EMAIL_PORT = SMTP_EMAIL_PORT
EMAIL_USE_TLS = SMTP_EMAIL_USE_TLS

DJOSER = {
    'DOMAIN': "localhost:8000",
    'PASSWORD_RESET_CONFIRM_URL': "#/password/reset/confirm/{uid}/{token}",
    'USERNAME_RESET_CONFIRM_URL': "#/username/reset/confirm/{uid}/{token}",
    'ACTIVATION_URL': "activate/{uid}/{token}",
    'SEND_ACTIVATION_EMAIL': True,
    'SERIALIZERS': {
        'user': 'authentification.serializers.AuthSerializer',
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

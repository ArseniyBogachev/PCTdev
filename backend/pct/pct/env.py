import os
from dotenv import load_dotenv
load_dotenv()

# SERVER
SRV_SECRET_KEY = os.getenv("SRV_SECRET_KEY")
SRV_HOST = os.getenv("SRV_HOST")
SRV_CORS_ORIGIN_WHITELIST = os.getenv("SRV_CORS_ORIGIN_WHITELIST")

# DATABASES
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

# SMTP
SMTP_EMAIL_HOST_USER = os.getenv("SMTP_EMAIL_HOST_USER")
SMTP_EMAIL_HOST_PASSWORD = os.getenv("SMTP_EMAIL_HOST_PASSWORD")
SMTP_EMAIL_HOST = os.getenv("SMTP_EMAIL_HOST")
SMTP_EMAIL_PORT = os.getenv("SMTP_EMAIL_PORT")
SMTP_EMAIL_USE_TLS = os.getenv("SMTP_EMAIL_USE_TLS")

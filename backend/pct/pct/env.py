import os
from dotenv import load_dotenv
load_dotenv()

#HOSTS
FRONTEND_IP_PORT=os.getenv("FRONTEND_IP_PORT")
BACKEND_IP_PORT=os.getenv("BACKEND_IP_PORT")

# SERVER
SRV_SECRET_KEY = os.getenv("SRV_SECRET_KEY")

# DATABASES
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_NAME = os.getenv("DB_NAME")

# SMTP
SMTP_EMAIL_HOST_USER = os.getenv("SMTP_EMAIL_HOST_USER")
SMTP_EMAIL_HOST_PASSWORD = os.getenv("SMTP_EMAIL_HOST_PASSWORD")

# DJOSER
DJ_DOMAIN = os.getenv("DJ_DOMAIN")

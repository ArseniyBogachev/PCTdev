import os
from dotenv import load_dotenv
load_dotenv()

# SERVER
SRV_SECRET_KEY = os.getenv("SRV_SECRET_KEY")

# DATABASES
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")

# SMTP
SMTP_EMAIL_HOST_USER = os.getenv("SMTP_EMAIL_HOST_USER")
SMTP_EMAIL_HOST_PASSWORD = os.getenv("SMTP_EMAIL_HOST_PASSWORD")

# DJOSER
DJ_DOMAIN = os.getenv("DJ_DOMAIN")

# Добавление переменных окружения.
1) Создать файл .env со следующими переменными:
   **SRV_SECRET_KEY** - ключ шифрования (можно сгенерировать [здесь](https://djecrety.ir/));
   **SMTP_EMAIL_HOST_USER** - имя почтового ящика;
   **SMTP_EMAIL_HOST_PASSWORD** - пароль почтового ящика;
*Необходимо создать почтовый ящик Gmail или воспользоваться уже имеющимся. Важное уточнение:
в целях безопасности, Gmail предлагает сгенерировать отдельный пароль для приложения.
Подробнее об этом можно прочитать [здесь](https://support.google.com/mail/answer/185833?hl=en)
Инструкцию по созданию пароля для приложения [здесь](https://dev.to/abderrahmanemustapha/how-to-send-email-with-django-and-gmail-in-production-the-right-way-24ab)
2) После добавления переменных необходимо, чтобы файл .env находился в корне директории **backend**.
*BASE_PATH/PCTdev/backend*
3) Запустить docker, находясь в корне всего проекта *BASE_PATH/PCTdev*: **docker-compose up --build**

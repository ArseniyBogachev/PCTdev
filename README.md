# Добавление переменных окружения.
1) Создать файл .env со следующими переменными:<br/>
   **SRV_SECRET_KEY** - ключ шифрования (можно сгенерировать [здесь](https://djecrety.ir/));<br/>
   **SMTP_EMAIL_HOST_USER** - имя почтового ящика;<br/>
   **SMTP_EMAIL_HOST_PASSWORD** - пароль почтового ящика;<br/>
*Необходимо создать почтовый ящик Gmail или воспользоваться уже имеющимся. Важное уточнение:<br/>
в целях безопасности, Gmail предлагает сгенерировать отдельный пароль для приложения.*
Подробнее об этом можно прочитать [здесь](https://support.google.com/mail/answer/185833?hl=en)<br/>
Инструкцию по созданию пароля для приложения [здесь](https://dev.to/abderrahmanemustapha/how-to-send-email-with-django-and-gmail-in-production-the-right-way-24ab)
2) После добавления переменных необходимо, чтобы файл .env находился в корне директории **backend**.<br/>
*BASE_PATH/PCTdev/backend*
3) Запустить docker, находясь в корне всего проекта *BASE_PATH/PCTdev*: **docker-compose up --build**

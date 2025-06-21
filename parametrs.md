<h1 align="center">Получение собственных параметров</h1>

## ⚙️ Конфигурация

### Переменные окружения (.env)

```bash
# База данных
POSTGRES_DB=название БД
POSTGRES_USER=Имя пользователя БД
POSTGRES_PASSWORD=Пароль пользователя БД
# рекомендуется 5432 при работе с докером
POSTGRES_PORT=Порт БД
# рекомендуется postgres
POSTGRES_HOST=Host БД 

# Приложение
APP_PORT=Порт работы сервера
NODE_ENV=production

# Wildberries API
JWT_WB=Токен сотрудника ВБ

# id таблицы находится в ее url между .../d/id_sheet/...
GOOGLE_ID=id таблицы 

# об этом пункте подробнее ниже
GOOGLE_SERVICE_ACCOUNT_EMAIL=email service
GOOGLE_PRIVATE_KEY="приватный ключ"
```

## Получить данные google api

> Переходим по [ссылке](https://theoephraim.github.io/node-google-spreadsheet/#/guides/authentication), проходим Service Account. В конце получаем json файл в котором будет поле с email и private_key.
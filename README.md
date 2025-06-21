<h1 align="center">Парсер тарифов</h1>

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="60" height="60">
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" width="60" height="60">
  &nbsp;&nbsp;
  <img src="https://knexjs.org/knex-logo.png" alt="Knex.js" width="60" height="60">
  &nbsp;&nbsp;
  <img src="data:image/jpeg;base64,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" alt="Wildberries" width="60" height="60">
  &nbsp;&nbsp;
  <img src="https://storage.googleapis.com/gweb-workspace-assets/uploads/7uffzv9dk4sn-2saPASNQaWzk3n5OvSnkAU-c912a0e13d9947bd5c831dd37283cea2-Sheets_Template5050Hero_Logo.svg" alt="Google Sheets API" width="80" height="80">
</div>

<p align="center">
  Автоматизированный сервис для мониторинга тарифов Wildberries с сохранением в Google Sheets
</p>

## 📋 Содержание

- [Технологии](#🚀-технологии)
- [Возможности](#📋-возможности)
- [Установка и запуск](#🛠-установка-и-запуск)
  - [Требования](#требования)
  - [Быстрый старт](#быстрый-старт)
- [Разработка](#🔄-разработка)
- [API Endpoints](#📊-api-endpoints)
- [Мониторинг](#📈-мониторинг)
- [Миграции](#🛠-миграции)
- [Google таблицы](#📋-google-sheets)

## 🚀 Технологии

- **NestJS** - Фреймворк для Node.js
- **TypeScript** - Типизированный JavaScript
- **Knex.js** - SQL Query Builder
- **PostgreSQL** - База данных
- **Wildberries API** - Получение тарифов
- **Google Sheets API** - Сохранение данных
- **Docker** - Контейнеризация

## 📋 Возможности

- ⏰ Автоматический сбор данных каждый час
- 📊 Сохранение в PostgreSQL базу данных
- 📈 Экспорт в Google Sheets
- 🐳 Docker контейнеризация
- 🔄 Автоматические миграции

## 🛠 Установка и запуск

### Требования
- Docker и Docker Compose
- Node.js 20+ (для локальной разработки)

### Быстрый старт

1. **Клонирование репозитория:**
```bash
git clone <тут добавить URL репозитория>
cd test_wb
```

2. **Настройка переменных окружения:**

> ⚙️ Вставьте свои [параметры](/parametrs.md) в .env

3. **Запуск с Docker:**
```bash
docker-compose up
```

## 🔄 Разработка

### Пересборка контейнера
> *При изменении списка id таблиц в файле .env*
```bash

docker-compose down
docker-compose build app
docker-compose up
```

## 📊 API Endpoints

- `GET /run` - Принудительно выполнение парсинга

## 📈 Мониторинг

Приложение автоматически:
- Собирает данные каждый час
- Сохраняет в PostgreSQL
- Экспортирует в Google Sheets
- Логирует все операции

## 🛠 Миграции

```bash
# Запустить миграции
npx knex migrate:latest
# Откатить миграцию
npx knex migrate:rollback
# Заполнить принудительно id таблицы в БД
npx knex seed:run
```

## 📋 Google sheets

### Создайте таблицы

> Нажмите поделиться таблицей, введите email вашего сервиса (узнать из настроек параметров env) и дайте права редактора
---
> Лист назовите stocks_coefs
---
> Столбцы в таком порядке назовите Date-dtNextBox-dtTillMax-boxDeliveryAndStorageExpr-boxDeliveryBase-boxDeliveryLiter-boxStorageBase-boxStorageLiter-warehouseName

### Настройка сортировки

> В верхнем меню таблицы выберите Расширения→AppScript и вставьте следующий код

```bash
function myFunction() {
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('stocks_coefs');
  let range = sheet.getDataRange();
  let rangeWithoutHeader = range.offset(1, 0, range.getNumRows() - 1, range.getNumColumns());
  let columnToSort = 4;
  rangeWithoutHeader.sort( { column : columnToSort, ascending: true } );
}

```

**Затем поставьте таймер, как часто будет обновляться:**

>Выберите в левой панели Триггеры→Добавление триггера→Выберите источник мероприятия(триггер по времени)→Настройте время выполнения сортировки→Сохранить

**🚨 ВАЖНО** 

Такой способ позволяет сортировать по коэффициенту постоянно.
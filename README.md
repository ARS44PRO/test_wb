<h1 align="center">Парсер тарифов</h1>

<div align="center">
  <img src="https://nestjs.com/img/logo-small.svg" alt="NestJS" width="60" height="60">
  &nbsp;&nbsp;
  <img src="https://raw.githubusercontent.com/remojansen/logo.ts/master/ts.png" alt="TypeScript" width="60" height="60">
  &nbsp;&nbsp;
  <img src="https://knexjs.org/knex-logo.png" alt="Knex.js" width="60" height="60">
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
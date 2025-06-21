import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';
import { Database } from '../db/actions/db.service';
import { Google_api } from '../google_api/google.service';
require('dotenv').config();

@Injectable()
export class Schedule_get_data implements OnModuleInit {
  private readonly logger = new Logger(Schedule_get_data.name);
  
  constructor(
    private readonly httpService: HttpService,
    private readonly db: Database,
    private readonly google: Google_api
  ) {}

  async onModuleInit() {
    this.logger.log('Начало работы модуля');
    this.logger.log('Получение данных по апи инициализировано!');
    await this.get_data();
  }

  @Cron(CronExpression.EVERY_HOUR)
  async get_data() {
    try {
      const today = dayjs().format('YYYY-MM-DD');
      
      this.logger.log('Запрос к WB API...');
      const response = await firstValueFrom(
        this.httpService.get(
          'https://common-api.wildberries.ru/api/v1/tariffs/box',
          {
            params: {
              date: today,
            },
            headers: {
              Authorization: process.env.JWT_WB,
            },
          }
        )
      );

      this.logger.log('Данные получены от WB API');

      await this.db.create_update(response.data.response.data, today);
      this.logger.log('Данные сохранены в БД');

      await this.google.add(response.data.response.data, today);
      this.logger.log('Данные сохранены в Google Sheets');

    } catch (error) {
      this.logger.error('=== ДЕТАЛИ ОШИБКИ ===');
      this.logger.error(`Сообщение: ${error.message || 'Нет сообщения'}`);
      this.logger.error(`Тип ошибки: ${error.name || error.constructor.name}`);
      
      if (error.response) {
        this.logger.error(`HTTP статус: ${error.response.status}`);
        this.logger.error(`HTTP статус текст: ${error.response.statusText}`);
        this.logger.error(`HTTP данные: ${JSON.stringify(error.response.data, null, 2)}`);
      }
      
      if (error.request) {
        this.logger.error('Запрос был отправлен, но ответ не получен');
        this.logger.error(`URL: ${error.config?.url}`);
        this.logger.error(`Метод: ${error.config?.method}`);
      }
      
      if (error.code) {
        this.logger.error(`Код ошибки: ${error.code}`);
      }
      
      this.logger.error(`Стек ошибки: ${error.stack}`);
      this.logger.error('=== КОНЕЦ ДЕТАЛЕЙ ===');
    }
  }

  async run() {
    this.logger.log('Ручной запуск получения данных');
    await this.get_data();
  }
}
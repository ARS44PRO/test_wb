import { Injectable, Logger } from "@nestjs/common";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { OnModuleInit } from "@nestjs/common";
import { Knex } from "knex";
import { InjectConnection } from "nest-knexjs";
require('dotenv').config();

interface data {
  dtNextBox: string;
  dtTillMax: string;
  warehouseList: {
    boxDeliveryAndStorageExpr: string;
    boxDeliveryBase: string;
    boxDeliveryLiter: string;
    boxStorageBase: string;
    boxStorageLiter: string;
    warehouseName: string;
  }[];
}

@Injectable()
export class Google_api implements OnModuleInit {
  private readonly logger = new Logger(Google_api.name);
  private serviceAccountAuth: JWT;
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async onModuleInit() {
    try {
      this.serviceAccountAuth = new JWT({
        email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
      });
      await this.serviceAccountAuth.authorize();
      this.logger.log('Инициализация с google успешно');
    } catch (error) {
      this.logger.log('Ошибка с инициализацией google', error);
    }
  }

  async add(data: data, date: string) {
    try {
      const info = await this.knex('sheets').select('google_id');

      for ( const i of info ) {
        const doc = new GoogleSpreadsheet(i.google_id, this.serviceAccountAuth);
        await doc.loadInfo();
        const sheet = doc.sheetsByTitle['stocks_coefs'];
        const more_rows = await sheet.addRows(data.warehouseList.map(prev => ({Date: date, dtNextBox: data.dtNextBox, dtTillMax: data.dtTillMax, ...prev})));
        this.logger.log('send data to ', i);
      }
    } catch (error) {
      this.logger.log('Ошибка в отправке в google', error);
    }
  }
  
}
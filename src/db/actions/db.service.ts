import { Injectable, Logger } from '@nestjs/common';
import { privateDecrypt } from 'crypto';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

interface rates {
  id: number;
  date: string;
  dtNextBox: string;
  dtTillMax: string;
}

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
export class Database {
  constructor(@InjectConnection() private readonly knex: Knex) {}
  private readonly logger = new Logger(Database.name);

  async create_update(data: data, date: string): Promise<void> {
    const exist_note = await this.knex('rates').where('date', date).first();
    if (!exist_note) {
      const [newRate] = await this.knex('rates').insert<rates>({
        date: date,
        dtNextBox: data.dtNextBox,
        dtTillMax: data.dtTillMax,
      }).returning('*');

      this.logger.log('Создан rate');

      await this.knex('warehouseList').insert(data.warehouseList.map(prev => ({...prev, rate_id: newRate.id})));
    } else {
      await this.knex('rates').where('id', exist_note.id).update<rates>({
        dtNextBox: data.dtNextBox,
        dtTillMax: data.dtTillMax
      });
      for (let i=0; i<data.warehouseList.length; i++) {
        await this.knex('warehouseList').where('rate_id', exist_note.id).andWhere('warehouseName',data.warehouseList[i].warehouseName).update(data.warehouseList[i]);
      }  
    }
  }
}
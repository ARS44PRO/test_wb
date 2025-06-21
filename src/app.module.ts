import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { Schedule_get_data } from './wb_api/schedule.service';
import { Database } from './db/actions/db.service';
import { KnexModule } from 'nest-knexjs';
import { ScheduleModule } from '@nestjs/schedule';
import { HttpModule } from '@nestjs/axios';
import { Google_api } from './google_api/google.service';
require('dotenv').config();

@Module({
  imports: [
    KnexModule.forRoot({
      config: {
        client: 'postgresql',
        connection: {
          host: process.env.POSTGRES_HOST,
          user: process.env.POSTGRES_USER,
          password: process.env.POSTGRES_PASSWORD,
          database: process.env.POSTGRES_DB,
          port: Number(process.env.POSTGRES_PORT)
        },
      },
    }),
    ScheduleModule.forRoot(),
    HttpModule,
  ],
  controllers: [AppController],
  providers: [Schedule_get_data,Database,Google_api],
})
export class AppModule {}

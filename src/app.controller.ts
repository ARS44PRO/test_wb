import { Controller, Get } from '@nestjs/common';
import { Schedule_get_data } from './wb_api/schedule.service';

@Controller()
export class AppController {
  constructor(private readonly schedule: Schedule_get_data) {}

  @Get('run')
  getHello() {
    return this.schedule.run();
  }
}

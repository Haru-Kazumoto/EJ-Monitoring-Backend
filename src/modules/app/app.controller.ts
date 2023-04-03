import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('app')
export class AppController {
  constructor(readonly appService: AppService){}

  @Get('hello')
  getHello(): string {
    return this.appService.getHello();
  }
}

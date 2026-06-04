import { Controller, Get } from '@nestjs/common';
import { createHealthPayload } from './app.service';

@Controller()
export class AppController {
  @Get('/api/health')
  health() {
    return createHealthPayload();
  }
}

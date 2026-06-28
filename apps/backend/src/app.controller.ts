import { Controller, Get } from '@nestjs/common';
import { Public } from '@mguay/nestjs-better-auth';

@Controller()
export class AppController {
  @Get()
  @Public()
  health() {
    return true;
  }
}

import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class NotifierController {
  @MessagePattern('notify')
  async send() {
    console.log('sending email...');
  }
}

import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotifyStrategy } from './strategies/notify-strategy';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';

@Controller()
export class NotifierController {
  private readonly logger = new Logger(NotifierController.name);
  private notifiers: { [type: string]: NotifyStrategy } = {};

  constructor() {
    this.notifiers['email'] = new EmailStrategy();
    this.notifiers['sms'] = new SmsStrategy();
  }

  @MessagePattern('notify')
  async send(@Payload() data: { type: string; message: any }) {
    try {
      this.notifiers[data.type].send();
    } catch (err) {
      this.logger.error(err);
    }
  }
}

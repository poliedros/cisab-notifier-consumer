import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';

@Controller()
export class NotifierController {
  private readonly logger = new Logger(NotifierController.name);

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
  ) {}

  @EventPattern('county_created')
  async handleEmail(@Payload() data: { type: string; message: any }) {
    try {
      this.emailStrategy.send();
    } catch (err) {
      this.logger.error(err);
    }
  }

  @EventPattern('county_created')
  async handleSms(@Payload() data: { type: string; message: any }) {
    try {
      this.smsStrategy.send();
    } catch (err) {
      this.logger.error(err);
    }
  }
}

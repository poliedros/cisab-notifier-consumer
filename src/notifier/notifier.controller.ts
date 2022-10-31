import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { ConfirmChannel, Message } from 'amqplib';

@Controller()
export class NotifierController {
  private readonly logger = new Logger(NotifierController.name);

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
  ) {}

  @EventPattern('county_created')
  async handleEmail(
    @Payload() data: { type: string; message: { body: string } },
    @Ctx() context: RmqContext,
  ) {
    try {
      await this.emailStrategy.send(data.message.body);

      const channel = context.getChannelRef() as ConfirmChannel;
      const message = context.getMessage() as Message;
      channel.ack(message);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @EventPattern('county_created')
  async handleSms(
    @Payload() data: { type: string; message: { body: string } },
  ) {
    try {
      this.smsStrategy.send(data.message.body);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

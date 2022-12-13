import { Controller, Logger } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { ConfirmChannel, Message } from 'amqplib';
import { ManagerCreatedRequest } from './dto/request/manager-created-request.dto';
import { EmailService } from '@czarpoliedros/email';

@Controller()
export class NotifierController {
  private readonly logger = new Logger(NotifierController.name);

  constructor(
    private readonly emailStrategy: EmailStrategy,
    private readonly smsStrategy: SmsStrategy,
    private readonly emailService: EmailService,
  ) {}

  @EventPattern('send_email')
  async handleSendEmail(
    @Payload() data: ManagerCreatedRequest,
    @Ctx() context: RmqContext,
  ) {
    try {
      this.logger.log(`trying to send email to: ${data.message.to}...`);
      await this.emailService.sendMail({
        subject: data.message.subject,
        to: data.message.to,
        body: data.message.body,
        from: process.env.FROM_EMAIL,
        body_html: data.message.body,
      });

      const channel = context.getChannelRef() as ConfirmChannel;
      const message = context.getMessage() as Message;
      channel.ack(message);
      this.logger.log(`email has been sent to ${data.message.to}`);
    } catch (err) {
      this.logger.error(err);
    }
  }
}

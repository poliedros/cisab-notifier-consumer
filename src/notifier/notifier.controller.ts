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

  @EventPattern('county_created')
  async handleEmail(
    @Payload() data: { type: string; message: { body: string } },
    @Ctx() context: RmqContext,
  ) {
    try {
      // await this.emailStrategy.send(data.message.body);

      const channel = context.getChannelRef() as ConfirmChannel;
      const message = context.getMessage() as Message;
      channel.ack(message);
    } catch (err) {
      this.logger.error(err);
    }
  }

  @EventPattern('manager_created')
  async handleManagerCreated(
    @Payload() data: ManagerCreatedRequest,
    @Ctx() context: RmqContext,
  ) {
    try {
      this.logger.log(`trying to send email to: ${data.message.to}...`);
      await this.emailService.sendMail({
        subject: 'Cadastro Cisab',
        to: data.message.to,
        body: data.message.body,
        from: 'undefined751@gmail.com',
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

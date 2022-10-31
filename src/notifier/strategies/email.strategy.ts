import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '@czarpoliedros/email';
import { NotifyStrategy } from './notify-strategy';

@Injectable()
export class EmailStrategy implements NotifyStrategy {
  private readonly logger = new Logger(EmailStrategy.name);

  constructor(private readonly emailService: EmailService) {}

  async send(body: string): Promise<void> {
    this.logger.log('Sending email...');

    await this.emailService.sendMail(
      'carlos@czar.dev',
      'carlos@czar.dev',
      'hello world',
      body,
      `<h1>${body}</h1>`,
    );
  }
}

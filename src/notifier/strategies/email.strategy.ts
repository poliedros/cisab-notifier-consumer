import { Injectable, Logger } from '@nestjs/common';
import { EmailService } from '@czarpoliedros/email';
import { NotifyStrategy } from './notify-strategy';

@Injectable()
export class EmailStrategy implements NotifyStrategy {
  private readonly logger = new Logger(EmailStrategy.name);

  constructor(private readonly emailService: EmailService) {}

  async send(body: string): Promise<void> {
    const to = 'carlos@czar.dev';

    try {
      await this.emailService.sendMail({
        from: 'carlos@czar.dev',
        to: to,
        subject: 'hello world',
        body: body,
        body_html: `<h1>${body}</h1>`,
      });

      this.logger.log(`Email sent to ${to}`);
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}

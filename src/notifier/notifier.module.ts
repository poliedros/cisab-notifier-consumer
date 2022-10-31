import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { Module } from '@nestjs/common';
import { NotifierController } from './notifier.controller';
import { EmailModule } from '@czarpoliedros/email';

@Module({
  imports: [
    EmailModule.forRoot({
      email: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    }),
  ],
  controllers: [NotifierController],
  providers: [EmailStrategy, SmsStrategy],
})
export class NotifierModule {}

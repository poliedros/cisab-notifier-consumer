import { EmailModule } from '@czarpoliedros/email';
import { ConfigModule } from '@nestjs/config';
import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { Module } from '@nestjs/common';
import { NotifierController } from './notifier.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmailModule.forRoot({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      email: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      secure: Boolean(process.env.SMTP_SECURE),
    }),
  ],
  controllers: [NotifierController],
  providers: [EmailStrategy, SmsStrategy],
})
export class NotifierModule {}

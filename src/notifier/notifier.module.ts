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
      email: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
    }),
  ],
  controllers: [NotifierController],
  providers: [EmailStrategy, SmsStrategy],
})
export class NotifierModule {}

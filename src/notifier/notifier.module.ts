import { SmsStrategy } from './strategies/sms.strategy';
import { EmailStrategy } from './strategies/email.strategy';
import { Module } from '@nestjs/common';
import { NotifierController } from './notifier.controller';

@Module({
  controllers: [NotifierController],
  providers: [EmailStrategy, SmsStrategy],
})
export class NotifierModule {}

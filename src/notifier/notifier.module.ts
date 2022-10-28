import { Module } from '@nestjs/common';
import { NotifierController } from './notifier.controller';

@Module({
  controllers: [NotifierController],
})
export class NotifierModule {}

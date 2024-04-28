import { Module } from '@nestjs/common';
import { NotifierModule } from './notifier/notifier.module';
import { EmailModule } from './email/email.module';

@Module({
  imports: [NotifierModule, EmailModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { NotifierModule } from './notifier/notifier.module';

@Module({
  imports: [NotifierModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

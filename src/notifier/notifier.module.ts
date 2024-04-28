import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { NotifierController } from './notifier.controller';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EmailModule.forRoot({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      email: process.env.SMTP_USER,
      password: process.env.SMTP_PASSWORD,
      secure: false,
    }),
  ],
  controllers: [NotifierController],
  providers: [],
})
export class NotifierModule {}

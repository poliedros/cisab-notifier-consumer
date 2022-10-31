import { Injectable } from '@nestjs/common';
import { NotifyStrategy } from './notify-strategy';

@Injectable()
export class SmsStrategy implements NotifyStrategy {
  async send(body: string): Promise<void> {
    console.log('sending sms...');
  }
}

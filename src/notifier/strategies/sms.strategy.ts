import { NotifyStrategy } from './notify-strategy';

export class SmsStrategy implements NotifyStrategy {
  async send(): Promise<void> {
    console.log('sending sms...');
  }
}

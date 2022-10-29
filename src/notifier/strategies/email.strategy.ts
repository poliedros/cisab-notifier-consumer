import { NotifyStrategy } from './notify-strategy';

export class EmailStrategy implements NotifyStrategy {
  async send(): Promise<void> {
    console.log('sending email...');
  }
}

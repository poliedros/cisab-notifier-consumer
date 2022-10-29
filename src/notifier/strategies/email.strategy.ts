import { Injectable } from '@nestjs/common';
import { NotifyStrategy } from './notify-strategy';

@Injectable()
export class EmailStrategy implements NotifyStrategy {
  async send(): Promise<void> {
    console.log('sending email...');
  }
}

import { DynamicModule, Global, Module } from '@nestjs/common';
import { SMTP_CONFIG_OPTIONS } from './constants';
import { EmailService } from './email.service';
import { createTransport } from 'nodemailer';
import { SmtpOptions } from './interfaces/smtp-options.interface';

@Global()
@Module({})
export class EmailModule {
  public static forRoot(smtpOptions: SmtpOptions): DynamicModule {
    const transporter = createTransport({
      name: smtpOptions.host,
      host: smtpOptions.host,
      port: smtpOptions.port,
      secure: smtpOptions.secure,
      auth: {
        user: smtpOptions.email,
        pass: smtpOptions.password,
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });

    return {
      module: EmailModule,
      providers: [
        {
          provide: SMTP_CONFIG_OPTIONS,
          useValue: transporter,
        },
        EmailService,
      ],
      exports: [EmailService],
      global: true,
    };
  }
}

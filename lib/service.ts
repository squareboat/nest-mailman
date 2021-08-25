import { map } from './provider.map';
import * as nodemailer from 'nodemailer';
import { Injectable, Inject } from '@nestjs/common';
import { MailmanOptions, MailData, SendMailOptions } from './interfaces';

@Injectable()
export class MailmanService {
  private static options: MailmanOptions;
  private static transporter: any;

  constructor(@Inject(map.MAILABLE_OPTIONS) options: MailmanOptions) {
    MailmanService.options = options;
    MailmanService.transporter = nodemailer.createTransport(
      {
        host: options.host,
        port: options.port,
        secure: options.port === 465 ? true : false,
        auth: { user: options.username, pass: options.password },
      },
      { from: options.from }
    );
  }

  static getConfig(): MailmanOptions {
    return MailmanService.options;
  }

  static async send(options: SendMailOptions) {
    const config = MailmanService.options;
    const mailData: MailData = options.mail.getMailData();
    const mail: Record<string, any> = {
      to: options.receipents,
      cc: options.cc,
      bcc: options.bcc,
      from: options.sender || config.from,
      html: mailData.html,
      subject: mailData.subject,
      attachments: mailData.attachments,
    };
    if (options.replyTo || config.replyTo) {
      mail.replyTo = options.replyTo || config.replyTo;
    }
    if (options.inReplyTo) {
      mail.inReplyTo = options.inReplyTo;
    }
    await MailmanService.transporter.sendMail(mail);
  }
}

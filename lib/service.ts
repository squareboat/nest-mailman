import { map } from './provider.map';
import * as nodemailer from 'nodemailer';
import { Injectable, Inject } from '@nestjs/common';
import { MailmanOptions } from './interfaces';
import * as Handlebars from 'handlebars';
import { readFileSync } from 'fs';
import path = require('path');
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';
import { MAILMAN_QUEUE, SEND_MAIL } from './constants';

@Injectable()
export class MailmanService {
  private static options: MailmanOptions;
  private static transporter: any;
  private static queueProvider: any;

  constructor(
    @Inject(map.MAILABLE_OPTIONS) private options: MailmanOptions,
    @InjectQueue(MAILMAN_QUEUE) queueProvider: Queue,
  ) {
    MailmanService.options = options;
    MailmanService.queueProvider = queueProvider;
    MailmanService.transporter = nodemailer.createTransport(
      {
        host: options.host,
        port: +options.port,
        auth: {
          user: options.username,
          pass: options.password,
        },
      },
      { from: options.from },
    );
  }

  static queue(options: Record<string, any>) {
    MailmanService.queueProvider.add(SEND_MAIL, options);
  }

  static async send(options: Record<string, any>) {
    await MailmanService.transporter.sendMail({
      html: this.compileTemplate(options.template, options.payload),
      to: options.recepient,
      subject: options.subject,
    });
  }

  static compileTemplate(template: string, payload: Record<string, any>): any {
    const templateCompiler = Handlebars.compile(
      readFileSync(path.join(MailmanService.options.path, template), 'utf-8'),
    );
    return templateCompiler(payload);
  }
}

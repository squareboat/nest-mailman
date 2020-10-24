import { map } from "./provider.map";
import * as nodemailer from "nodemailer";
import { Injectable, Inject } from "@nestjs/common";
import { MailmanOptions, MailData } from "./interfaces";
import { MailMessage } from "./message";

@Injectable()
export class MailmanService {
  private static options: MailmanOptions;
  private static transporter: any;

  constructor(@Inject(map.MAILABLE_OPTIONS) options: MailmanOptions) {
    MailmanService.options = options;
    MailmanService.transporter = nodemailer.createTransport(
      {
        host: options.host,
        port: +options.port,
        auth: { user: options.username, pass: options.password },
      },
      { from: options.from }
    );
  }

  static getConfig(): MailmanOptions {
    return MailmanService.options;
  }

  static async send(options: {
    receipents: string | string[];
    mail: MailMessage;
  }) {
    const mailData: MailData = options.mail.getMailData();
    await MailmanService.transporter.sendMail({
      html: mailData.html,
      to: options.receipents,
      subject: mailData.subject,
    });
  }
}

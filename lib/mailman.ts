import { MailmanService } from './service';
import { MailMessage } from './MailMessage';
import { MailData } from './interfaces';
export class Mailman {
  static async send(mailMessage: MailMessage) {
    const mail: MailData = mailMessage.getMailData();
    await MailmanService.send({
      recepient: mail.recepient,
      subject: mail.subject,
      html: mail.html,
    });
  }

  static async queue(mailMessage: MailMessage) {
    const mail: MailData = mailMessage.getMailData();
    await MailmanService.send({
      recepient: mail.recepient,
      subject: mail.subject,
      html: mail.html,
    });
  }
}

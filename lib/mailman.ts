import { MailmanService } from "./service";
import { MailMessage } from "./message";
import { MailData } from "./interfaces";
export class Mailman {
  private receipents: string | string[];

  private constructor() {
    this.receipents = "";
  }

  static init() {
    return new Mailman();
  }

  to(receipents: string | string[]): this {
    this.receipents = receipents;
    return this;
  }

  send(mail: MailMessage) {
    return MailmanService.send({
      mail,
      receipents: this.receipents,
    });
  }

  queue(mail: MailMessage) {
    return MailmanService.queue({
      mail,
      receipents: this.receipents,
    });
  }
}

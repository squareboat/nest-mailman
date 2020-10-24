import { MailmanService } from "./service";
import { MailMessage } from "./message";
import { MailData } from "./interfaces";
export class Mailman {
  private receipents: string | string[];
  private sender: string;

  private constructor() {
    this.receipents = "";
    this.sender = "";
  }

  static init() {
    return new Mailman();
  }

  from(sender: string): this {
    this.sender = sender;
    return this;
  }

  to(receipents: string | string[]): this {
    this.receipents = receipents;
    return this;
  }

  send(mail: MailMessage) {
    return MailmanService.send({
      mail,
      sender: this.sender,
      receipents: this.receipents,
    });
  }
}

import { MailmanService } from "./service";
import { MailMessage } from "./message";
import { MailData } from "./interfaces";
export class Mailman {
  private receipents: string | string[];
  private ccReceipents: string | string[];
  private bccReceipents: string | string[];
  private sender: string;

  private constructor() {
    this.sender = "";
    this.receipents = "";
    this.ccReceipents = "";
    this.bccReceipents = "";
  }

  static init() {
    return new Mailman();
  }

  /**
   *
   * @param sender
   */
  from(sender: string): this {
    this.sender = sender;
    return this;
  }

  /**
   *
   * @param receipents
   */
  to(receipents: string | string[]): this {
    this.receipents = receipents;
    return this;
  }

  /**
   *
   * @param ccreceipents
   */
  cc(ccreceipents: string | string[]): this {
    this.ccReceipents = ccreceipents;
    return this;
  }

  bcc(bccreceipents: string | string[]): this {
    this.bccReceipents = [];
    return this;
  }

  send(mail: MailMessage) {
    return MailmanService.send({
      mail,
      cc: this.ccReceipents,
      bcc: this.bccReceipents,
      sender: this.sender,
      receipents: this.receipents,
    });
  }
}

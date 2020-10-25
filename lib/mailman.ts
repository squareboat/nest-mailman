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

  /**
   * Returns new instance
   */
  static init() {
    return new Mailman();
  }

  /**
   * `FROM` in email address.
   * Use this method to override the `from` address provided in configuration.
   * @param sender
   */
  from(sender: string): this {
    this.sender = sender;
    return this;
  }

  /**
   * `TO` in email address
   * @param receipents
   */
  to(receipents: string | string[]): this {
    this.receipents = receipents;
    return this;
  }

  /**
   * `CC` in email addres
   * @param ccreceipents
   */
  cc(ccReceipents: string | string[]): this {
    this.ccReceipents = ccReceipents;
    return this;
  }

  /**
   * `BCC` in email address
   * @param bccReceipents
   */
  bcc(bccReceipents: string | string[]): this {
    this.bccReceipents = bccReceipents;
    return this;
  }

  /**
   * Send mail
   * @param mail
   */
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

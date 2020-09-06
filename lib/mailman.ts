import { MailmanService } from "./service";

export class Mailman {
  private mailSubject: string | undefined;
  private viewFile: string | undefined;
  private templateString: string | undefined;
  private recepient: string | Array<string> | undefined;
  private payload?: Record<string, any>;

  to(email: string | Array<string>): this {
    this.recepient = email;
    return this;
  }

  view(viewFile: string, payload?: Record<string, any>): this {
    this.viewFile = viewFile;
    this.payload = payload;
    return this;
  }

  template(template: string, payload?: Record<string, any>): this {
    this.templateString = template;
    this.payload = payload;
    return this;
  }

  subject(subject: string): this {
    this.mailSubject = subject;
    return this;
  }

  async send() {
    await MailmanService.send({
      recepient: this.recepient,
      payload: this.payload,
      view: this.viewFile,
      template: this.templateString,
      subject: this.mailSubject,
    });
  }

  queue() {
    MailmanService.queue({
      recepient: this.recepient,
      payload: this.payload,
      view: this.viewFile,
      template: this.templateString,
      subject: this.mailSubject,
    });
  }

  static init() {
    return new Mailman();
  }
}

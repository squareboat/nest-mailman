import { MailmanService } from './service';

export class Mailman {
  private mailSubject: string | undefined;
  private template: string | undefined;
  private recepient: string | Array<string> | undefined;
  private payload?: Record<string, any>;

  to(email: string | Array<string>): this {
    this.recepient = email;
    return this;
  }

  view(template: string, payload?: Record<string, any>): this {
    this.template = template;
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
      template: this.template,
      subject: this.mailSubject,
    });
  }

  queue() {
    MailmanService.queue({
      recepient: this.recepient,
      payload: this.payload,
      template: this.template,
      subject: this.mailSubject,
    });
  }

  static init() {
    return new Mailman();
  }
}

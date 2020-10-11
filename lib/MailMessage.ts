import { readFileSync } from 'fs';
import path = require('path');
import * as Handlebars from 'handlebars';

import {
  GENERIC_MAIL,
  RAW_MAIL,
  VIEW_BASED_MAIL,
  GENERIAL_MAIL_TEMPLATE_PATH,
} from './constants';
import { MailData, MailType } from './interfaces';
import { MailmanService } from './service';
import { Mailman } from './mailman';

export class MailMessage extends Mailman {
  private recepient?: string | Array<string>;
  private mailSubject?: string;

  private viewFile?: string;
  private templateString?: string;
  private payload?: Record<string, any>;
  private mailType: MailType;

  constructor() {
    super();
    this.mailType = RAW_MAIL;
  }

  to(email: string | Array<string>): this {
    this.recepient = email;
    return this;
  }

  subject(subject: string): this {
    this.mailSubject = subject;
    return this;
  }

  view(viewFile: string, payload?: Record<string, any>): this {
    this.mailType = VIEW_BASED_MAIL;
    this.viewFile = viewFile;
    this.payload = payload;
    return this;
  }

  template(template: string, payload?: Record<string, any>): this {
    this.mailType = RAW_MAIL;
    this.templateString = template;
    this.payload = payload;
    return this;
  }

  /** ===== GENERIC MAIL METHODS ====== */

  greeting(greeting: string): this {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ greeting });
    return this;
  }

  line(line: string) {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ line });
    return this;
  }

  action(text: string, link: string) {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ action: { text, link } });
    return this;
  }

  /** ================================= */

  private _setGenericMailProperties() {
    this.mailType = GENERIC_MAIL;
    if (!this.payload || !this.payload.genericFields) {
      this.payload = { genericFields: [] };
    }
  }

  private _compileTemplate(): string {
    let templateCompiler;
    if (this.mailType === GENERIC_MAIL) {
      templateCompiler = Handlebars.compile(
        readFileSync(path.join(__dirname, GENERIAL_MAIL_TEMPLATE_PATH), 'utf-8')
      );
    } else if (this.mailType === VIEW_BASED_MAIL && this.viewFile) {
      templateCompiler = Handlebars.compile(
        readFileSync(
          path.join(MailmanService.getConfig().path, this.viewFile),
          'utf-8'
        )
      );
    } else if (this.mailType === RAW_MAIL && this.templateString) {
      templateCompiler = Handlebars.compile(this.templateString);
    }
    if (!templateCompiler) {
      return '';
    }
    return templateCompiler(this.payload);
  }

  getMailData(): MailData {
    let compiledHtml = this._compileTemplate();
    return {
      recepient: this.recepient,
      subject: this.mailSubject,
      html: compiledHtml,
    };
  }
}

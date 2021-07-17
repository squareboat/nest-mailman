import ejs from 'ejs';
import { Attachment } from 'nodemailer/lib/mailer';
import * as path from 'path';

import { GENERIC_MAIL, RAW_MAIL, VIEW_BASED_MAIL } from './constants';
import { MailData, MailType } from './interfaces';
import { MailmanService } from './service';
import { getCompiledHtml } from './utils/fileCompiler';
import { EJSCompiler } from './compilers';

export class MailMessage {
  private mailSubject?: string;
  private viewFile?: string;
  private templateString?: string;
  private payload?: Record<string, any>;
  private mailType: MailType;
  private compiledHtml: string;
  private attachments: Record<string, Attachment>;

  constructor() {
    this.attachments = {};
    this.compiledHtml = '';
    this.mailType = RAW_MAIL;
  }

  /**
   * static method to create new instance of the MailMessage class
   */
  static init(): MailMessage {
    return new MailMessage();
  }

  /**
   * Define subject of the mail
   * @param subject
   */
  subject(subject: string): this {
    this.mailSubject = subject;
    return this;
  }

  /**
   * Define the view to be used for the mail
   * @param viewFile
   * @param payload
   */
  view(viewFile: string, payload?: Record<string, any>): this {
    this.mailType = VIEW_BASED_MAIL;
    this.viewFile = viewFile;
    this.payload = payload;
    return this;
  }

  /**
   * Define the template string to be used for the mail
   * @param template
   * @param payload
   */
  raw(template: string, payload?: Record<string, any>): this {
    this.mailType = RAW_MAIL;
    this.templateString = template;
    this.payload = payload;
    return this;
  }

  /**
   * Add attachment to the mail
   * @param greeting
   */
  attach(filename: string, content: Omit<Attachment, 'filename'>): this {
    this.attachments[filename] = { ...content, filename };
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * Use this method for adding the greeting to the generic mail
   * @param greeting
   */
  greeting(greeting: string): this {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ greeting });
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * Use this method for adding a text line to the generic mail
   * @param line
   */
  line(line: string): this {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ line });
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * Use this method for adding a url action to the generic mail
   * @param text
   * @param link
   */
  action(text: string, link: string): this {
    this._setGenericMailProperties();
    this.payload!.genericFields.push({ action: { text, link } });
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * @param greeting
   */
  private _setGenericMailProperties() {
    this.mailType = GENERIC_MAIL;
    if (!this.payload || !this.payload.genericFields) {
      this.payload = { genericFields: [] };
    }
  }

  /**
   * Method to compile templates
   */
  private async _compileTemplate(): Promise<string> {
    if (this.compiledHtml) return this.compiledHtml;

    if (this.mailType === GENERIC_MAIL) {
      // Sets the resource path to library's views/mails directory, to render includes
      const mailCompiler = new EJSCompiler('generic', { configPath: path.join(__dirname, 'views/mail') });
      this.compiledHtml = await mailCompiler.compileMail(this.payload || {});
      return this.compiledHtml;
    }

    if (this.mailType === VIEW_BASED_MAIL && this.viewFile) {
      const config = MailmanService.getConfig();
      if (config.path) {
        const configOptions = {
          configPath: config.path,
          mjml: config.mjml,
        };
        this.compiledHtml = await getCompiledHtml(
          this.viewFile,
          configOptions,
          this.payload
        );
        return this.compiledHtml;
      } else {
        throw new Error('Bad Request');
      }
    }

    if (this.mailType === RAW_MAIL && this.templateString) {
      const template = ejs.compile(this.templateString);
      this.compiledHtml = template(this.payload);
      return this.compiledHtml;
    }

    return this.compiledHtml;
  }

  /**
   * Returns the maildata payload
   */
  async getMailData(): Promise<MailData> {
    if (typeof (this as any).handle === 'function') {
      (this as any)['handle']();
    }

    const html = await this._compileTemplate();
    return {
      subject: this.mailSubject,
      html,
      attachments: Object.values(this.attachments),
    };
  }

  /**
   * Render the email template.
   * Returns the complete html of the mail.
   */
  async render(): Promise<string> {
    return await this._compileTemplate();
  }
}

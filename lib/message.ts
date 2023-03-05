import { Attachment } from "nodemailer/lib/mailer";
import { GENERIC_MAIL, RAW_MAIL, VIEW_BASED_MAIL } from "./constants";
import {
  MailData,
  MailType,
  MailmanMetaPayload,
  MailmanPayload,
} from "./interfaces";
import { MailmanService } from "./service";
import { renderToMjml } from "@faire/mjml-react/utils/renderToMjml";
import mjml2html from "mjml";

export class MailMessage {
  private mailSubject?: string;
  private viewFile?: (payload: Record<string, any>) => JSX.Element;
  private templateString?: string;
  private payload: MailmanPayload = {};
  private mailType: MailType;
  private compiledHtml: string;
  private attachments: Record<string, Attachment>;

  constructor() {
    this.attachments = {};
    this.compiledHtml = "";
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
  view(
    component: (payload: Record<string, any>) => JSX.Element,
    payload?: Record<string, any>
  ): this {
    this.mailType = VIEW_BASED_MAIL;
    this.viewFile = component;
    this.payload = payload || {};
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
    this.payload = payload || {};
    return this;
  }

  /**
   * Add attachment to the mail
   * @param greeting
   */
  attach(filename: string, content: Omit<Attachment, "filename">): this {
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
    if (this.payload.genericFields) {
      this.payload?.genericFields.push({ greeting });
    }
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * Use this method for adding a text line to the generic mail
   * @param line
   */
  line(line: string): this {
    this._setGenericMailProperties();
    if (this.payload.genericFields) {
      this.payload?.genericFields.push({ line });
    }
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
    if (this.payload.genericFields) {
      this.payload.genericFields.push({ action: { text, link } });
    }
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * Use this method for adding a table to the generic mail
   * @param data
   */
  table(data: Record<string, any>[]): this {
    this._setGenericMailProperties();
    if (this.payload.genericFields) {
      this.payload.genericFields.push({ table: data });
    }

    return this;
  }

  meta(payload: MailmanMetaPayload): this {
    this.payload.meta = payload;
    return this;
  }

  /**
   * ==> Generic Template Method <==
   * @param greeting
   */
  private _setGenericMailProperties() {
    this.mailType = GENERIC_MAIL;
    if (!this.payload || !this.payload.genericFields) {
      this.payload.genericFields = [];
    }
  }

  /**
   * Method to compile templates
   */
  private _compileTemplate(): string {
    if (this.compiledHtml) return this.compiledHtml;
    const config = MailmanService.getConfig();

    const componentData = {
      ...this.payload,
      _templateConfig: config.templateOptions,
    };

    if (this.mailType === GENERIC_MAIL) {
      const component = config.baseComponent;

      const { html } = mjml2html(renderToMjml(component(componentData)));
      this.compiledHtml = html;
      return this.compiledHtml;
    }

    if (this.mailType === VIEW_BASED_MAIL && this.viewFile) {
      const component = this.viewFile;
      const { html } = mjml2html(renderToMjml(component(componentData)));
      this.compiledHtml = html;
      return this.compiledHtml;
    }

    if (this.mailType === RAW_MAIL && this.templateString) {
      return this.compiledHtml;
    }

    return this.compiledHtml;
  }

  /**
   * Returns the maildata payload
   */
  getMailData(): MailData {
    if (typeof (this as any).handle === "function") {
      (this as any)["handle"]();
    }

    return {
      subject: this.mailSubject,
      html: this._compileTemplate(),
      attachments: Object.values(this.attachments),
    };
  }

  /**
   * Render the email template.
   * Returns the complete html of the mail.
   */
  render(): string {
    return this._compileTemplate();
  }
}

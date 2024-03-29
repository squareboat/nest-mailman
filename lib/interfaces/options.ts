import { ModuleMetadata, Type } from "@nestjs/common/interfaces";
import { Attachment } from "nodemailer/lib/mailer";
import { MailMessage } from "../message";
import { MJMLParsingOpts } from "./mjml";

export interface MailmanBaseTemplateOptions {
  appName?: string;
  appLogoSrc?: string;
  socialMedia?: {
    name: string;
    href: string;
  }[];
  contactEmail?: string;
}

export interface MailmanMetaPayload {
  title?: string;
  preview?: string;
}

export interface MailmanPayload {
  _templateConfig?: MailmanBaseTemplateOptions;
  meta?: MailmanMetaPayload;
  genericFields?: Record<string, any>[];
}

export interface MailmanOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  from: string;
  ignoreTLS?: boolean;
  replyTo?: string;
  path?: string;
  mjml?: MJMLParsingOpts;
  templateConfig: {
    baseComponent: (payload: Record<string, any>) => JSX.Element;
    templateOptions?: MailmanBaseTemplateOptions;
  };
}

export type CompilerOptions = {
  configPath: string;
  mjml?: MJMLParsingOpts;
};

export interface MailmanOptionsFactory {
  createMailmanOptions(): Promise<MailmanOptions> | MailmanOptions;
}

export interface MailmanAsyncOptions extends Pick<ModuleMetadata, "imports"> {
  name?: string;
  useExisting?: Type<MailmanOptions>;
  useClass?: Type<MailmanOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<MailmanOptions> | MailmanOptions;
  inject?: any[];
}

export interface MailData {
  subject?: string;
  html: string;
  attachments: Attachment[];
}

export interface SendMailOptions {
  sender: string;
  replyTo?: string;
  inReplyTo?: string;
  mail: MailMessage;
  cc: string | string[];
  bcc: string | string[];
  receipents: string | string[];
}

export type MailType = "RAW" | "VIEW_BASED" | "GENERIC";

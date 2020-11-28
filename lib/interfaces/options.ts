import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { Attachment } from 'nodemailer/lib/mailer';
import { MailMessage } from '../message';
import { MJMLParsingOpts } from './mjml';

export interface MailmanOptions {
  host: string;
  port: number;
  username: string;
  password: string;
  from: string;
  path?: string;
  mjml?: MJMLParsingOpts;
}

export type CompilerOptions = {
  configPath: string;
  mjml?: MJMLParsingOpts;
};

export interface MailmanOptionsFactory {
  createMailmanOptions(): Promise<MailmanOptions> | MailmanOptions;
}

export interface MailmanAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
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
  mail: MailMessage;
  cc: string | string[];
  bcc: string | string[];
  receipents: string | string[];
}

export type MailType = 'RAW' | 'VIEW_BASED' | 'GENERIC';

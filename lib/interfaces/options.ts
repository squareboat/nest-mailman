import { ModuleMetadata, Type } from "@nestjs/common/interfaces";

export interface MailmanOptions {
  host: string;
  port: string;
  username: string;
  password: string;
  from: string;
  path: string;
}

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

import { readFileSync } from 'fs';
import * as path from 'path';
import mjml2html from 'mjml';
import { compile } from 'handlebars';
import { MailCompiler } from './../interfaces';

export class MJMLCompiler implements MailCompiler {
  filePath: string;

  constructor(filename: string, configPath: string) {
    this.filePath = path.join(configPath, filename);
  }

  compileMail(options: Record<string, any>): string {
    const { mjml: mjmlOptions, ...context } = options;
    let emailFile = readFileSync(this.filePath, 'utf-8');
    let mjml = emailFile;
    if (context) {
      const template = compile(emailFile);
      mjml = template(context);
    }
    return mjml2html(mjml, mjmlOptions).html;
  }
}

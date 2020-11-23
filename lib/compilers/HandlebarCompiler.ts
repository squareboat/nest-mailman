import { readFileSync } from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

import { MailCompiler } from './../interfaces';

export class HandlebarCompiler implements MailCompiler {
  filePath: string;

  constructor(filename: string, configPath: string) {
    this.filePath = path.join(configPath, `${filename}.hbs`);
  }

  compileMail(options: Record<string, any>) {
    const template = Handlebars.compile(readFileSync(this.filePath, 'utf-8'));
    return template(options);
  }
}

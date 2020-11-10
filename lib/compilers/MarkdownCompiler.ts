import { readFileSync } from 'fs';
import * as path from 'path';
import * as Handlebars from "handlebars";

import { MailCompiler } from './../interfaces';

export class MarkdownCompiler implements MailCompiler {
  filePath: string;

  constructor(filename: string, configPath: string) {
    this.filePath = path.join(configPath, filename);
  }

  compileMail(options: Record<string, any>) {
    const template = Handlebars.compile(
      '{{#markdown}}' + readFileSync(this.filePath, 'utf-8') + '{{/markdown}}'
    );
    return template(options);
  }
}

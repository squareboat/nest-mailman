import { readFileSync } from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';

import { CompilerOptions, MailCompiler } from './../interfaces';

export class MarkdownCompiler implements MailCompiler {
  filePath: string;
  compilerOptions: CompilerOptions;

  constructor(filename: string, compilerOptions: CompilerOptions) {
    this.filePath = path.join(compilerOptions.configPath, filename);
    this.compilerOptions = compilerOptions;
  }

  compileMail(options: Record<string, any>) {
    const template = Handlebars.compile(
      '{{#markdown}}' + readFileSync(this.filePath, 'utf-8') + '{{/markdown}}'
    );
    return template(options);
  }
}

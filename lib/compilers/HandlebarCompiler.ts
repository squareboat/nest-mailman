import { readFileSync } from 'fs';
import * as path from 'path';
import * as Handlebars from 'handlebars';
import mjml2html from 'mjml';

import { MailCompiler, CompilerOptions } from './../interfaces';

export class HandlebarCompiler implements MailCompiler {
  filePath: string;
  compilerOptions: CompilerOptions;

  constructor(filename: string, compilerOptions: CompilerOptions) {
    this.filePath = path.join(compilerOptions.configPath, `${filename}.hbs`);
    this.compilerOptions = compilerOptions;
  }

  compileMail(options: Record<string, any>) {
    const template = Handlebars.compile(readFileSync(this.filePath, 'utf-8'));
    const compiledHtml = template(options);

    if (compiledHtml.indexOf('<mjml>') !== -1) {
      return mjml2html(compiledHtml, this.compilerOptions.mjml).html;
    }
    return compiledHtml;
  }
}

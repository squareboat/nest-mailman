import * as path from 'path';
import ejs from 'ejs';
import mjml2html from 'mjml';

import { MailCompiler, CompilerOptions } from '../interfaces';

export class EJSCompiler implements MailCompiler {
  filePath: string;
  compilerOptions: CompilerOptions;

  constructor(filename: string, compilerOptions: CompilerOptions) {
    this.filePath = path.join(compilerOptions.configPath, `${filename}.ejs`);
    this.compilerOptions = compilerOptions;
  }

  async compileMail(options: Record<string, any>) {
    const compiledHtml = await ejs.renderFile(this.filePath, options);

    if (compiledHtml.indexOf('<mjml>') !== -1) {
      return mjml2html(compiledHtml, this.compilerOptions.mjml).html;
    }
    return compiledHtml;
  }
}

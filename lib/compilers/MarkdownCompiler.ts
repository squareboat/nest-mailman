import * as path from 'path';
import * as ejs from 'ejs';

const md = require('markdown-it')();

import { CompilerOptions, MailCompiler } from './../interfaces';

export class MarkdownCompiler implements MailCompiler {
  filePath: string;
  compilerOptions: CompilerOptions;

  constructor(filename: string, compilerOptions: CompilerOptions) {
    this.filePath = path.join(compilerOptions.configPath, filename);
    this.compilerOptions = compilerOptions;
  }

  async compileMail(options: Record<string, any>) {
    const compiledHtml = await ejs.renderFile(this.filePath, options);

    const template = md.render(compiledHtml);
    return template;
  }
}

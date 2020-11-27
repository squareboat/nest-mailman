import {
  HandlebarCompiler,
  MarkdownCompiler,
  MJMLCompiler,
} from '../compilers';

import { MailCompiler } from './../interfaces';

export const getCompiledHtml = (
  filename: string,
  configPath: string,
  options: Record<string, any> | undefined
): string => {
  const namesBreakdown = filename.split('.');
  const extension = namesBreakdown.pop();
  let mailCompiler: MailCompiler;
  if (extension === 'md') {
    mailCompiler = new MarkdownCompiler(filename, configPath);
  } else if (extension === 'mjml') {
    mailCompiler = new MJMLCompiler(filename, configPath);
  } else {
    mailCompiler = new HandlebarCompiler(filename, configPath);
  }
  return mailCompiler.compileMail(options);
};

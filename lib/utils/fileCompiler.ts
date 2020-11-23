import { HandlebarCompiler, MarkdownCompiler } from '../compilers';

import { MailCompiler } from './../interfaces';

export const getCompiledHtml = (
  filename: string,
  configPath: string,
  options: Record<string, any> | undefined
): string => {

  const namesBreakdown = filename.split('.');
  let mailCompiler: MailCompiler;
  if (namesBreakdown.length > 0 && namesBreakdown.pop() === 'md') {
    mailCompiler = new MarkdownCompiler(filename, configPath);
  } else {
    mailCompiler = new HandlebarCompiler(filename, configPath);
  }

  return mailCompiler.compileMail(options);
};

import { HandlebarCompiler, MarkdownCompiler } from '../compilers';

import { MailCompiler, CompilerOptions } from './../interfaces';

export const getCompiledHtml = (
  filename: string,
  compilerOptions: CompilerOptions,
  payload: Record<string, any> | undefined
): string => {
  const namesBreakdown = filename.split('.');
  const extension = namesBreakdown.pop();
  let mailCompiler: MailCompiler;
  if (extension === 'md') {
    mailCompiler = new MarkdownCompiler(filename, compilerOptions);
  } else {
    mailCompiler = new HandlebarCompiler(filename, compilerOptions);
  }
  return mailCompiler.compileMail(payload);
};

import { EJSCompiler, MarkdownCompiler } from '../compilers';

import { MailCompiler, CompilerOptions } from './../interfaces';

export const getCompiledHtml = async (
  filename: string,
  compilerOptions: CompilerOptions,
  payload: Record<string, any> | undefined
): Promise<string> => {
  const namesBreakdown = filename.split('.');
  const extension = namesBreakdown.pop();
  let mailCompiler: MailCompiler;
  if (extension === 'md') {
    mailCompiler = new MarkdownCompiler(filename, compilerOptions);
  } else {
    mailCompiler = new EJSCompiler(filename, compilerOptions);
  }
  return await mailCompiler.compileMail(payload);
};

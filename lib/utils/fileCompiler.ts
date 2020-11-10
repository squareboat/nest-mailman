import { HandlebarCompiler } from '../compilers';

import { MailCompiler } from './../interfaces';

export const getCompiledHtml = (
  filename: string,
  configPath: string,
  options: Record<string, any> | undefined
): string => {

  let mailCompiler: MailCompiler;
  mailCompiler = new HandlebarCompiler(filename, configPath);
  return mailCompiler.compileMail(options);
};

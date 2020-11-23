// All mail compilers(Handlebars, Markdown, etc.) will implement this interface.
export interface MailCompiler {
  filePath: string;
  compileMail(options: Record<string, any> | undefined ): string;
}
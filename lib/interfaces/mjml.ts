export interface MJMLParsingOpts {
  fonts?: { [key: string]: string };
  keepComments?: boolean;
  beautify?: boolean;
  minify?: boolean;
  validationLevel?: 'strict' | 'soft' | 'skip';
  filePath?: string;
  /** mjml 5 ignores `<mj-include>` by default; set `false` to process includes */
  ignoreIncludes?: boolean;
  /** folder(s) that `<mj-include>` paths may point into (mjml 5 rejects other paths) */
  includePath?: string | string[];
  minifyOptions?: MJMLMinifyOptions;
}

interface MJMLMinifyOptions {
  collapseWhitespace?: boolean;
  minifyCSS?: boolean;
  removeEmptyAttributes?: boolean;
}

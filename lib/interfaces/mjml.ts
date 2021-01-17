export interface MJMLParsingOpts {
  fonts?: { [key: string]: string };
  keepComments?: boolean;
  beautify?: boolean;
  minify?: boolean;
  validationLevel?: 'strict' | 'soft' | 'skip';
  filePath?: string;
  minifyOptions?: MJMLMinifyOptions;
}

interface MJMLMinifyOptions {
  collapseWhitespace?: boolean;
  minifyCSS?: boolean;
  removeEmptyAttributes?: boolean;
}

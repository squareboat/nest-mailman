export type ActionOptions = {
  fallback: boolean;
  variant?: 'primary' | 'secondary' | 'link' | 'outline';
};

export type SocialLinks = Array<{
  label?: string;
  name:
    | 'facebook'
    | 'twitter'
    | 'google'
    | 'pinterest'
    | 'linkedin'
    | 'tumblr'
    | 'xing'
    | 'github'
    | 'instagram'
    | 'web'
    | 'snapchat'
    | 'youtube'
    | 'vimeo'
    | 'medium'
    | 'soundcloud'
    | 'dribbble';
  link: string;
}>;

export type TableData = Array<Array<string | number>>;

export interface SocialLinkModel {
  socialTypeCode: string;
  link: string;
  show: boolean;
}

export enum SocialTypeCode {
  NONE = 'NONE',
  FB = 'FB', //facebook
  TW = 'TW', //twitter
  IN = 'IN', //instagram
  YT = 'YT', //youtube
  TK = 'TK', //tiktok
  LI = 'LI', //LinkedIn
  SC = 'SC', //SoundCloud
}

export interface SocialTypes {
  name: string;
  logo: string;
  code: SocialTypeCode;
}

export const Socials: SocialTypes[] = [
  { name: 'FaceBook', code: SocialTypeCode.FB, logo: 'facebook.png' },
  { name: 'Twitter', code: SocialTypeCode.TW, logo: 'twitter.png' },
  { name: 'Instagram', code: SocialTypeCode.IN, logo: 'instagram.png' },
  { name: 'YouTube', code: SocialTypeCode.YT, logo: 'youtube.png' },
  { name: 'TikTok', code: SocialTypeCode.TK, logo: 'tiktok.png' },
  { name: 'LinkedIn', code: SocialTypeCode.LI, logo: 'linkin.png' },
];

export interface SocialModel {
  socialTypeCode: SocialTypeCode;
  link: string;
  show: boolean;
}

export interface MySocialState {
  models: SocialModel[];
}

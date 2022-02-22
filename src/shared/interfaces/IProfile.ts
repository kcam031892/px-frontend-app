import { ISection } from './ISection';

export interface IProfile {
  profileId: string;
  firstName: string;
  lastName: string;
  gender: string;
  isPrimary: boolean;
  primaryImage: string;
  ageFrom: number;
  ageTo: number;
  agencyCountry: string;
  agencyLogo: string;
  agencyName: string;
  agencyStateName: string;
  agencyTalentType: string;
  agencyType: number;
}

export interface IProfilePrimaryImage {
  profilePhotoId: number;
  profileId: string;
  image: string;
  originalName: string;
  photoName: string;
  photoTags: string[];
  tagOptions: string[];
}

export interface IProfileBiography {
  profileId: string;
  content: string;
}

export interface IProfileSection {
  profileId: string;
  sections: ISection[];
}

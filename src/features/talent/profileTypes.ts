import { AgencyType } from '../../types';

export interface ProfileViewModel {
  profileId: string;
  agencyId: number | undefined;
  agencyName: string;
  agencyType: AgencyType;
  isPrimary: boolean;
  agencyTalentType: string;
  agencyStateName: string;
  agencyCountry: string;
  agencyLogo: string;
  primaryImage: string;
  firstName: string;
  lastName: string;
  gender: string;
  ageFrom: number;
  ageTo: number;
  status: ProfileStatus;
}

export enum ProfileStatus {
  Active,
  Pending,
}

export interface ProfileState {
  profiles: ProfileViewModel[];
  agencies?: AgencySerachViewModel[];
}

export interface AgencySerachViewModel {
  agencyId: number;
  agencyName: string;
  agencyLogo: string;
  stateName: string;
  countryName: string;
}

export enum RepresentationRequestType {
  ADD,
  CHANGE,
}

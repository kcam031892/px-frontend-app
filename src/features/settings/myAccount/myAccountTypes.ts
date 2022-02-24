import { Gender, AgeType, ContactType } from '../../../types/commonTypes';
import { ArtistType, Country, State } from '../../../types/optinos';

export interface MyAccountModel {
  memberId: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: Date | null;
  email: string;
  contactNumberCountryCode: string;
  contactNumber: string;
  countryCode: string;
  homeStateId: number | null;
  primaryArtistTypeCode: string;
  ageType: AgeType;
  ageFrom: number | null;
  ageTo: number | null;
  preferContactMethod: ContactType;
  seekRepresentation: boolean;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  enableMultiFactorAuth: boolean;
  day: number;
  month: number;
  year: number;
}

export interface MyAccountState {
  model: MyAccountModel;
  ageOptions: number[];
  countries: Country[];
  states: State[];
  artistTypes: ArtistType[];
  valdiateErrors: ValidateError[];
}

export interface ValidateError {
  field: string;
  message: string;
}

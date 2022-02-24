import { Gender, AgeType, SizeUnit, SelectListItem, Result } from '../../../types';

export interface StatsState {
  model: StatsModel;
  isDirty: boolean;
}

export interface StatsOption {
  code: string;
  text: string;
  selectedValue: string;
  items: SelectListItem[];
}

export interface StatsModel {
  memberId: string;
  gender: string;
  region: string;
  ageType: AgeType;
  sizeUnit: SizeUnit;
  primaryArtistTypeName: string;
  options: StatsOption[];
  artistTypes: SelectListItem[];
  artistTypesTemp: SelectListItem[];
  ethnicities: EthnicityGroup[];
  ethnicitiesTemp: EthnicityGroup[];
}

export interface EthnicityGroup {
  text: string;
  items: EthnicityItem[];
}

export interface EthnicityItem {
  code: string;
  text: string;
  selected: boolean;
}

import { SectionType } from 'shared/enums/SectionType';

export interface ISection {
  section_type: SectionType;
  sequence: number;
  title: string;
  values: string[][];
  section_id: string;
}

export interface IProfile {
  age_from: number;
  age_to: number;
  agency_country: string;
  agency_logo: string;
  agency_name: string;
  agency_state_name: string;
  agency_talent_type: string;
  agency_type: string;
  first_name: string;
  last_name: string;
  gender: string;
  is_primary: boolean;
  primary_image: boolean;
}

import { RepresentationType } from 'shared/enums/RepresentationType';
import { SectionType } from 'shared/enums/SectionType';

export interface ISection {
  section_type: SectionType;
  sequence: number;
  title: string;
  values: string[][];
  section_id: string;
}

export interface IProfile {
  id: string;
  representation_type: RepresentationType;
  primary: boolean;
  status: string | null;
  country: string;
  note: string;
  confirmed_agreement: boolean;
  primary_image_url: string;
  agency_name: string | null;
  agency_company_type: string | null;
  agency_state: string | null;
  agency_country: string | null;
  agency_logo_url: string | null;
  agency_banner_url: string | null;
  created_at: number;
  updated_at: number;
}

export interface IProfileResponsePayload {
  data: {
    id: string;
    type: string;
    attributes: IProfile;
  }[];
}

export interface IProfileCreatePayload {
  representation_type: RepresentationType;
  country: string;
  note?: string;
  agency_name?: string;
}

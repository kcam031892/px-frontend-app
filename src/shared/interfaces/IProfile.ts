import { IComposite } from 'shared/constants/INITIAL_COMPOSITE_STATES';
import { ProfileStatus } from 'shared/enums/ProfileStatus';
import { RepresentationType } from 'shared/enums/RepresentationType';
import { SectionType } from 'shared/enums/SectionType';
import { ICommonCreateResponsePayload, ICommonResponsePayload } from './ICommon';
import { IResume } from './ITalent';

export interface IProfile {
  id: string;
  type: string;
  attributes: {
    representation_type: RepresentationType;
    primary: boolean;
    status: ProfileStatus | null;
    country: string;
    note: string;
    confirmed_agreement: boolean;
    primary_image_url: string;
    agency_id: string;
    agency_name: string | null;
    agency_company_type: string | null;
    agency_state: string | null;
    agency_country: string | null;
    agency_logo_url: string | null;
    agency_banner_url: string | null;
    profile_type: string;
    created_at: number;
    updated_at: number;
  };
}

export interface IProfileResponsePayload {
  data: IProfile[];
}

export interface ISingleProfileResponsePayload {
  data: IProfile;
}
export interface IProfileTabDetailReponsePayload {
  data: {
    id: string;
    type: string;
    attributes: {
      id: string;
      resume?: IResume;
      composite_card?: IComposite[];
    };
  };
}

export interface IProfileCreatePayload {
  representation_type: RepresentationType;
  country: string;
  note?: string;
  agency_id?: string;
  confirmed_agreement: boolean;
  profile_type: string;
}

export interface IProfileUpdatePayload {
  composite_card?: IComposite[];
}

export interface IProfilePrimaryImage {
  id: string;
  type: string;
  attributes: {
    primary: boolean;
    profile_id: string;
    modified_attachment: string;
    attachment: string;
    medium_id: string;
    medium_type: string;
    medium_tag_list: string[];
    medium_height: number;
    medium_width: number;
    medium_name: string;
  };
}

export interface IProfileMedia {
  id: string;
  type: string;
  attributes: {
    primary: boolean;
    profile_id: string;
    attachment: string;
    modified_attachment: string;
    medium_name: string;
    medium_id: string;
    medium_type: string;
    medium_tag_list: string[];
    medium_height: number;
    medium_width: number;
    medium_size: number;
    sort: number;
  };
}
export interface IProfilePrimaryImageResponsePayload extends ICommonCreateResponsePayload {
  data: IProfilePrimaryImage;
}

export interface IProfileCreateResponsePayload extends ICommonCreateResponsePayload {
  data: IProfile;
}

export interface IProfileMediaResponsePayload extends ICommonCreateResponsePayload {
  data: IProfileMedia[];
}

export interface IProfileMediaSetSelectPayload {
  medium_id: string;
  sort?: number;
}

import { SectionType } from 'shared/enums/SectionType';
import { ICommonCreateResponsePayload } from './ICommon';

export interface ISectionValues {
  fields: string[];
  attachments: string[];
}
export interface ISection {
  section_type: SectionType;
  sequence?: number;
  title: string;
  values: ISectionValues[];
  section_id: string;
}
export interface IResume {
  id: string;
  type: string;
  attributes: {
    id: string;
    resume_show_year: boolean;
    resume: ISection[];
  };
}

export interface ITalentResumeResponsePayload extends ICommonCreateResponsePayload {
  data: IResume;
}

export interface IBiography {
  id: string;
  type: string;
  attributes: {
    id: string;
    biography: string;
  };
}

export interface ITalentBiographyResponsePayload extends ICommonCreateResponsePayload {
  data: IBiography;
}

export interface IStatisticsValues {
  region?: string;
  adult_minor?: string;
  metric_system?: string;
  gender?: string;
  hair_color?: string;
  eye_color?: string;
  complexion?: string;
  height_cm?: string;
  height_in?: string;
  hat_in?: string;
  hat_cm?: string;
  weight_kg?: string;
  weight_lb?: string;
  waist_cm?: string;
  waist_in?: string;
  suit_size?: string;
  chest_size_cm?: string;
  chest_size_in?: string;
  collar_size_cm?: string;
  collar_size_in?: string;
  inside_leg_cm?: string;
  inside_leg_in?: string;
  outside_leg_cm?: string;
  outside_leg_in?: string;
  shoe_size?: string;
  t_shirt_size?: string;
  hip_size_cm?: string;
  hip_size_in?: string;
  ethnicity?: any[];
  other_talent_types?: any[];
}

export interface IStatistics {
  id: string;
  type: string;
  attributes: {
    id: string;
    statistics: IStatisticsValues;
  };
}

export interface ITalentStatisticsResponsePayload extends ICommonCreateResponsePayload {
  data: IStatistics;
}

export interface ITalentUpdatePayload {
  resume_show_year?: boolean;
  resume?: ISection[];
  biography?: string;
  statistics?: IStatisticsValues;
}

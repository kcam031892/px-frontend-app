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

export interface ITalentUpdatePayload {
  resume?: ISection[];
  biography?: string;
}

import { SectionType } from 'shared/enums/SectionType';
import { ICommonCreateResponsePayload } from './ICommon';

export interface ISection {
  section_type: SectionType;
  sequence?: number;
  title: string;
  values: string[][];
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

export interface ITalentUpdatePayload {
  resume?: ISection[];
}

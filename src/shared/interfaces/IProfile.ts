import { SectionType } from 'shared/enums/SectionType';

export interface ISection {
  section_type: SectionType;
  sequence: number;
  title: string;
  values: string[][];
  section_id: string;
}

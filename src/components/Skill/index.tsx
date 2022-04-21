import { IProficiencyItem } from 'shared/interfaces/IProficiency';
import IMedia from 'shared/interfaces/IMedia';

export type TSkill = {
  key: string;
  value: string;
  is_selected: boolean;
  proficiency: IProficiencyItem | null;
  media: IMedia[] | null;
};

export type TSubSkills = {
  subgroup: string;
  skills: TSkill[];
};

export type TCurrentSkill = {
  subgroup: string;
  skill: TSkill;
};

export type Props = {
  title: string;
  category: string;
};

export { default } from './Skill';

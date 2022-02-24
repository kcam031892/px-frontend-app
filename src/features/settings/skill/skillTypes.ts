import { SkillLevel } from '../../../types';

export interface SkillState {
  model: SkillModel;
  selectedGroupId: number;
  editGroup?: SkillGroup;
  pageType: SkillPageType;
}

export interface SkillModel {
  memberId: string;
  groups: SkillGroup[];
}

export interface SkillGroup {
  id: number;
  name: string;
  items: SkillItem[];
}

export interface SkillItem {
  id: number;
  name: string;
  selected: boolean;
  level: SkillLevel;
  subGroup: string;
}

export enum SkillPageType {
  List,
  Detail,
}

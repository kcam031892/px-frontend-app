import { MouseEventHandler } from 'react';
import IMedia from 'shared/interfaces/IMedia';

export type TSelectedIds = string[];

export type TCurrentSkill = {
  subGroupKey: string;
  skillKey: string;
};

export type Props = {
  isOpen: boolean;
  media: IMedia[];
  onConfirm: (selectedIds: TSelectedIds) => void;
  onCancel: MouseEventHandler<HTMLButtonElement>;
  initialSelectedIds: TSelectedIds;
};

export { default } from './MediaModal';

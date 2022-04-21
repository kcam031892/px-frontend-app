export interface IProficiency {
  category: string;
  values: IProficiencyItem[];
}

export interface IProficiencyItem {
  key: string;
  value: string;
}

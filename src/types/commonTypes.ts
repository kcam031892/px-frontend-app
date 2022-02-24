export enum Gender {
  FEMA = 'Female',
  MALE = 'Male',
  UNKN = 'Non Binary',
}

export enum AgeType {
  Adult,
  Minor,
}

export enum ContactType {
  Email = 'Email',
  SMS = 'SMS',
  Either = 'Either',
}

export enum ProfileItemType {
  MIMA,
  VALU,
  CONV,
}

export enum SkillLevel {
  Basic = 1,
  Good = 2,
  Professional = 3,
}

export enum SizeUnit {
  Both = 'Metric/Imperial',
  Metric = 'Metric',
  Imperial = 'Imperial',
}

export interface Country {
  code: string;
  name: string;
}

export interface SelectListItem {
  text: string;
  value: string;
  selected?: boolean;
}

export enum Months {
  Jan = 1,
  Feb,
  Mar,
  Apr,
  May,
  Jun,
  Jul,
  Aug,
  Sept,
  Oct,
  Nov,
  Dec,
}

export interface Result {
  type: ResultType;
  message: string;
  errors?: Error[];
  showMessage: boolean;
}

export interface DataResult<T> extends Result {
  data: T;
}

export enum ResultType {
  success,
  error,
  warning,
  info,
}

export interface Error {
  field: string;
  message: string;
}

export enum AgencyType {
  Represented,
  Freelance,
}

export enum ImageQuanlityLevel {
  None,
  Reject,
  Bad,
  Accept,
}

export enum MediaType {
  VIDEO,
  AUDIO,
  IMAGE,
  RESUME,
}

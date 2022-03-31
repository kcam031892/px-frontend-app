import { ICommon } from './ICommon';

interface IAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}
export interface IUser extends ICommon {
  id: string;
  type: string;
  attributes: IAttributes;
}

export interface ISignInRequestPayload {
  user: {
    email: string;
    password: string;
  };
}

export interface ISignInResponsePayload {
  message: string;
  data: IUser;
  token: string;
}

export interface ISignUpRequestPayload {
  first_name: string;
  last_name: string;
  contact_number: string;
  email: string;
  country: string;
  state: string;
  password: string;
}

export interface ISignUpResponsePayload {
  message: string;
  data: IUser;
  token: string;
}

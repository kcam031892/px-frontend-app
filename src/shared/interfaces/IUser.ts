import { ICommon } from './ICommon';

interface IAttributes {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  completed_primary_details: boolean;
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

export interface IForgotPasswordRequestPayload {
  email: string;
}

export interface IForgotPasswordResponsePayload {
  message: string;
}

export interface IResetPasswordRequestPayload {
  reset_password_token: string;
  password: string;
  password_confirmation: string;
}

export interface IResetPasswordResponsePayload {
  message: string;
}

export interface ISignUpRequestPayload {
  first_name: string;
  last_name: string;
  contact_number: number | null;
  email: string;
  country: string;
  country_code: string;
  state: string | undefined;
  user_type: string;
  password: string;
  password_confirmation: string;
}

export interface ISignUpResponsePayload {
  message: string;
  data: IUser;
  token: string;
}

export interface IUserCompleteProfilePayload {
  first_name: string;
  last_name: string;
  password: string;
  password_confirmation: string;
}

export interface IUserCompleteProfileResponsePayload {
  data: IUser;
  message: string;
}

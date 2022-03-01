import { ICommon } from './ICommon';

export interface IUser extends ICommon {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface ISignInRequestPayload {
  user: {
    email: string;
    password: string;
  };
}

export interface ISignInResponsePayload {
  message: string;
  user: IUser;
  token: string;
}

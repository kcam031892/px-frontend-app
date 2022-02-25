import axios from 'axios';
import { SignUpState } from '../features/account/signUp';
import { MyAccountModel } from '../features/settings/myAccount/myAccountTypes';
import { SocialModel } from '../features/settings/social/socialTypes';
import { DataResult, Result } from '../types/commonTypes';
import { AxiosConfig } from '../utils/axiosConfig';

export async function getAccount(memberId: string): Promise<MyAccountModel> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/${memberId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<MyAccountModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postAccount(account: MyAccountModel): Promise<Result> {
  let myAccount = account;
  if (myAccount.contactNumber && myAccount.contactNumberCountryCode) {
    myAccount = {
      ...myAccount,
      contactNumber: `${myAccount.contactNumberCountryCode}${myAccount.contactNumber}`,
    };
  }
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/${myAccount.memberId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, myAccount);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function login(email: string, password: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/login?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, {
      LoginName: email,
      Password: password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function forgot(email: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/forgot?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, {
      emailAddress: email,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function checkCode(code: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/checkCode?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, {
      code: code,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function reset(code: string, password: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/reset?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, {
      code: code,
      password: password,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function signUp(signUpState: SignUpState): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/signUp?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const postValue = { ...signUpState };
    postValue.contactNumber = `${signUpState.contactNumberCode}${signUpState.contactNumber}`;
    const response = await axios.post<Result>(url, postValue);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function signUpConfirm(memberId: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/signUpConfirm?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;

  try {
    const response = await axios.get<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getSocial(memberId: string): Promise<SocialModel[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/socials?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;

  try {
    const response = await axios.get<DataResult<SocialModel[]>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postSocial(memberId: string, social: SocialModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/account/socials?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;

  try {
    AxiosConfig.enableInterceptors = false;
    const response = await axios.post<Result>(url, social);
    return response.data;
  } catch (err) {
    throw err;
  } finally {
    AxiosConfig.enableInterceptors = true;
  }
}

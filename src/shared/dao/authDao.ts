import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  IForgotPasswordRequestPayload,
  IForgotPasswordResponsePayload,
  ISignInRequestPayload,
  ISignInResponsePayload,
  ISignUpRequestPayload,
  ISignUpResponsePayload,
  IUserCompleteProfilePayload,
  IUserCompleteProfileResponsePayload,
} from 'shared/interfaces/IUser';
import { authToken } from 'shared/utils/authToken';

const { GET, POST, DELETE, PATCH } = useAxios();

export const authDao = () => {
  const { getAuthToken } = authToken();
  const login = async (payload: ISignInRequestPayload) => {
    const response = await POST<ISignInResponsePayload>({
      url: `${ENDPOINTS.USERS}/sign_in`,
      data: payload,
    });

    return {
      data: response?.data,
    };
  };

  const signup = async (payload: ISignUpRequestPayload) => {
    const response = await POST<ISignUpResponsePayload>({
      url: `${ENDPOINTS.USERS}`,
      data: payload,
    });

    return {
      data: response?.data,
    };
  };

  const sendEmail = async (payload: IForgotPasswordRequestPayload) => {
    const response = await POST<IForgotPasswordResponsePayload>({
      url: `${ENDPOINTS.FORGOT_PASSWORD}`,
      data: payload,
    });

    return {
      data: response?.data,
    };
  };

  const loginWithGoogle = async (token: string) => {
    const response = await POST<ISignInResponsePayload>({
      url: `${ENDPOINTS.USERS}/google/sign_in?token=${token}`,
    });
    return {
      data: response?.data,
    };
  };

  const loginWithFacebook = async (token: string) => {
    const response = await POST<ISignInResponsePayload>({
      url: `${ENDPOINTS.USERS}/facebook/sign_in?token=${token}`,
    });

    return {
      data: response?.data,
    };
  };

  const getUserProfile = async () => {
    const response = await GET<ISignInResponsePayload>({
      url: `${ENDPOINTS.ME}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return {
      data: response?.data,
    };
  };

  const setCompleteProfile = async (payload: IUserCompleteProfilePayload) => {
    const response = await PATCH<IUserCompleteProfileResponsePayload>({
      url: `${ENDPOINTS.PROVIDER_AUTHENTICATION}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const logout = async () => {
    const response = await DELETE({
      url: `${ENDPOINTS.USERS}/sign_out`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return {
      data: response,
    };
  };

  return {
    login,
    signup,
    sendEmail,
    loginWithGoogle,
    loginWithFacebook,
    getUserProfile,
    setCompleteProfile,
    logout,
  };
};

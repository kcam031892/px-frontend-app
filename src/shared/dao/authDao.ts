import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  ISignInRequestPayload,
  ISignInResponsePayload,
  ISignUpRequestPayload,
  ISignUpResponsePayload,
} from 'shared/interfaces/IUser';
import { authToken } from 'shared/utils/authToken';

const { GET, POST, DELETE } = useAxios();
const { getAuthToken } = authToken();

export const authDao = () => {
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
    loginWithGoogle,
    loginWithFacebook,
    getUserProfile,
    logout,
  };
};

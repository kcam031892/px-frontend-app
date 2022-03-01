import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { ISignInRequestPayload, ISignInResponsePayload } from 'shared/interfaces/IUser';

import { tokenService } from './tokenService';
const { POST, DELETE } = useAxios();
const { getAuthToken } = tokenService();

export const authService = () => {
  const login = async (payload: ISignInRequestPayload) => {
    const response = await POST<ISignInResponsePayload>({
      url: `${ENDPOINTS.USERS}/sign_in`,
      data: payload,
    });

    return {
      data: response?.data,
    };
  };

  const loginWithGoogle = async (token: string) => {
    const response = await POST<ISignInResponsePayload>({
      url: `${ENDPOINTS.USERS}/google/sign_in?id_token=${token}`,
    });
    return {
      data: response?.data,
    };
  };

  const logout = async () => {
    const authToken = getAuthToken();
    const response = await DELETE({
      url: `${ENDPOINTS.USERS}/sign_out`,
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return {
      data: response,
    };
  };

  return {
    login,
    loginWithGoogle,
    logout,
  };
};

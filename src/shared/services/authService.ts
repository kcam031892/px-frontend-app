import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { ISignInRequestPayload, ISignInResponsePayload } from 'shared/interfaces/IUser';

const { POST, DELETE } = useAxios();
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
    const response = await DELETE({
      url: `${ENDPOINTS.USERS}/sign_out`,
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

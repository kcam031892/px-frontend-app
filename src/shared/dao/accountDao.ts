import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { IAccountResponsePayload, IAccountUpdatePayload } from 'shared/interfaces/IAccount';
import { authToken } from 'shared/utils/authToken';

const { GET, PATCH } = useAxios();

export const accountDao = () => {
  const { getAuthToken } = authToken();
  const getAccount = async () => {
    const response = await GET<IAccountResponsePayload>({
      url: `${ENDPOINTS.ME}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const updateAccount = async (payload: IAccountUpdatePayload) => {
    const response = await PATCH({
      url: `${ENDPOINTS.ME}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getAccount,
    updateAccount,
  };
};

import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { authToken } from 'shared/utils/authToken';

const { GET, POST } = useAxios();

export const profileDao = () => {
  const { getAuthToken } = authToken();
  const getProfiles = async () => {
    const response = await GET<IProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const createProfile = async (payload: IProfileCreatePayload) => {
    const response = await POST<IProfileCreateResponsePayload>({
      url: `${ENDPOINTS.PROFILE}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getProfiles,
    createProfile,
  };
};

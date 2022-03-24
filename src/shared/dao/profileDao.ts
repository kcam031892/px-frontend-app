import { useAxios } from 'shared/hooks/useAxios';
import { IProfileResponsePayload } from 'shared/interfaces/IProfile';
import { authToken } from 'shared/utils/authToken';

const { GET } = useAxios();
const { getAuthToken } = authToken();
export const profileDao = () => {
  const getProfiles = async () => {
    const response = await GET<IProfileResponsePayload>({
      url: `https://px-general-service.herokuapp.com/v1/profiles`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  return {
    getProfiles,
  };
};

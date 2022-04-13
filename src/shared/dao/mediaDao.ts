import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { IMediaRequestPayload, IMediaResponse } from 'shared/interfaces/IMedia';
import { authToken } from 'shared/utils/authToken';

const { GET } = useAxios();

export const mediaDao = () => {
  const { getAuthToken } = authToken();
  const getMediaList = async (payload?: IMediaRequestPayload) => {
    const response = await GET<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}`,
      params: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getMediaList,
  };
};

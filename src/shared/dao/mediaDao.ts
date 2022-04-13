import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { IMediaRequestPayload, IMediaResponse } from 'shared/interfaces/IMedia';
import { authToken } from 'shared/utils/authToken';

const { GET, PATCH } = useAxios();

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

  const updateMedia = async (mediumId: string, formData: FormData) => {
    const response = await PATCH<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}/${mediumId}`,
      data: formData,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const retrieveMediaUrl = async (id: string) => {
    const response = await GET({
      url: `${ENDPOINTS.MEDIA}/${id}`,
      params: {
        redirect: false,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getMediaList,
    updateMedia,
    retrieveMediaUrl,
  };
};

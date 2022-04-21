import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  IMediaRequestPayload,
  IMediaResponse,
  IRetrieveMultipleMediaUrlResponsePayload,
} from 'shared/interfaces/IMedia';
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

  const retrieveSingleMediaUrl = async (id: string) => {
    const response = await GET({
      url: `${ENDPOINTS.MEDIA}/${id}`,
    });
    return response.data;
  };

  const retrieveMultipleMediaUrl = async (ids: string[]) => {
    const response = await GET<IRetrieveMultipleMediaUrlResponsePayload>({
      url: `${ENDPOINTS.MEDIA_URLS}`,
      params: {
        ids,
      },
    });
    return response.data;
  };

  return {
    getMediaList,
    updateMedia,
    retrieveSingleMediaUrl,
    retrieveMultipleMediaUrl,
  };
};

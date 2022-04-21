import { QueryFunction, useMutation, useQuery, UseQueryOptions } from 'react-query';
import { mediaDao } from 'shared/dao/mediaDao';
import { IMediaRequestPayload, IMediaResponse } from 'shared/interfaces/IMedia';
const {
  getMediaList: getMediaListDao,
  updateMedia: updateMediaDao,
  retrieveSingleMediaUrl: retrieveSingleMediaUrlDao,
  retrieveMultipleMediaUrl: retrieveMultipleMediaUrlDao,
} = mediaDao();
export const mediaService = () => {
  const getMediaList = (
    payload?: IMediaRequestPayload,
    options?: Omit<UseQueryOptions<IMediaResponse, Error, IMediaResponse>, 'queryKey'>,
  ) => {
    return useQuery<IMediaResponse, Error, IMediaResponse>(['media', payload], () => getMediaListDao(payload), options);
  };
  const updateMedia = () => {
    return useMutation(({ mediumId, formData }: { mediumId: string; formData: FormData }) =>
      updateMediaDao(mediumId, formData),
    );
  };

  const retrieveSingleMediaUrl = (id: string) => {
    return useQuery(['retrieve_media_url', id], () => retrieveSingleMediaUrlDao(id));
  };

  const retrieveMultipleMediaUrl = (ids: string[]) => {
    return useQuery(['retrieve_media_urls', ids], () => retrieveMultipleMediaUrlDao(ids), {
      enabled: ids?.length > 0,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });
  };

  return {
    getMediaList,
    updateMedia,
    retrieveSingleMediaUrl,
    retrieveMultipleMediaUrl,
  };
};

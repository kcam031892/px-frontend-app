import { useMutation, useQuery } from 'react-query';
import { mediaDao } from 'shared/dao/mediaDao';
import { IMediaRequestPayload } from 'shared/interfaces/IMedia';
const { getMediaList: getMediaListDao, updateMedia: updateMediaDao } = mediaDao();
export const mediaService = () => {
  const getMediaList = (payload?: IMediaRequestPayload) => {
    return useQuery(['media', payload], () => getMediaListDao(payload));
  };
  const updateMedia = () => {
    return useMutation(({ mediumId, formData }: { mediumId: string; formData: FormData }) =>
      updateMediaDao(mediumId, formData),
    );
  };

  return {
    getMediaList,
    updateMedia,
  };
};

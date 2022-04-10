import { useQuery } from 'react-query';
import { mediaDao } from 'shared/dao/mediaDao';
import { IMediaRequestPayload } from 'shared/interfaces/IMedia';
const { getMediaList: getMediaListDao } = mediaDao();
export const mediaService = () => {
  const getMediaList = (payload?: IMediaRequestPayload) => {
    return useQuery(['media', payload], () => getMediaListDao(payload));
  };

  return {
    getMediaList,
  };
};

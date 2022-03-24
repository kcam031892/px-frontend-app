import { useQuery } from 'react-query';
import { profileDao } from 'shared/dao/profileDao';
import { IProfileResponsePayload } from 'shared/interfaces/IProfile';

const { getProfiles: getProfilesDao } = profileDao();
export const profileService = () => {
  const getProfiles = () => {
    return useQuery<IProfileResponsePayload, Error>(['profiles'], () => getProfilesDao());
  };

  return {
    getProfiles,
  };
};

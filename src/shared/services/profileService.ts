import { useMutation, useQuery } from 'react-query';
import { profileDao } from 'shared/dao/profileDao';
import { IProfileCreatePayload, IProfileResponsePayload } from 'shared/interfaces/IProfile';

const { getProfiles: getProfilesDao, createProfile: createProfileDao } = profileDao();
export const profileService = () => {
  const getProfiles = () => {
    return useQuery<IProfileResponsePayload, Error>(['profiles'], () => getProfilesDao());
  };

  const createProfile = () => {
    return useMutation((payload: IProfileCreatePayload) => createProfileDao(payload));
  };

  return {
    getProfiles,
    createProfile,
  };
};

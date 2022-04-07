import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { profileDao } from 'shared/dao/profileDao';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfilePrimaryImageResponsePayload,
  IProfileResponsePayload,
  ISingleProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';

const {
  getProfiles: getProfilesDao,
  getSingleProfile: getSingleProfileDao,
  createProfile: createProfileDao,
  getProfilePrimaryImage: getProfilePrimaryImageDao,
  setProfilePrimaryImage: setProfilePrimaryImageDao,
} = profileDao();
export const profileService = () => {
  const getProfiles = () => {
    return useQuery<IProfileResponsePayload, Error>(['profiles'], () => getProfilesDao());
  };

  const getSingleProfile = (id: string) => {
    return useQuery<ISingleProfileResponsePayload, Error>(['profile', id], () => getSingleProfileDao(id));
  };

  const createProfile = () => {
    return useMutation<IProfileCreateResponsePayload, AxiosError<IErrorResponse>, IProfileCreatePayload>(
      (payload: IProfileCreatePayload) => createProfileDao(payload),
    );
  };

  const getProfilePrimaryImage = (profileId: string) => {
    return useQuery<IProfilePrimaryImageResponsePayload>(['profile_primary_image', profileId], () =>
      getProfilePrimaryImageDao(profileId),
    );
  };

  const setProfilePrimaryImage = () => {
    return useMutation(
      ({
        profileId,
        formData,
        onProgress,
      }: {
        profileId: string;
        formData: FormData;
        onProgress: (current: number) => void;
      }) => setProfilePrimaryImageDao(profileId, formData, onProgress),
    );
  };

  return {
    getProfiles,
    getSingleProfile,
    createProfile,
    getProfilePrimaryImage,
    setProfilePrimaryImage,
  };
};

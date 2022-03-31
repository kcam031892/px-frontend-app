import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { profileDao } from 'shared/dao/profileDao';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';

const { getProfiles: getProfilesDao, createProfile: createProfileDao } = profileDao();
export const profileService = () => {
  const getProfiles = () => {
    return useQuery<IProfileResponsePayload, Error>(['profiles'], () => getProfilesDao());
  };

  const createProfile = () => {
    return useMutation<IProfileCreateResponsePayload, AxiosError<IErrorResponse>, IProfileCreatePayload>(
      (payload: IProfileCreatePayload) => createProfileDao(payload),
    );
  };

  return {
    getProfiles,
    createProfile,
  };
};

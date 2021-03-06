import { AxiosError } from 'axios';
import { useMutation, useQuery } from 'react-query';
import { profileDao } from 'shared/dao/profileDao';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfileMediaSetSelectPayload,
  IProfilePrimaryImageResponsePayload,
  IProfileResponsePayload,
  IProfileTabDetailReponsePayload,
  IProfileUpdatePayload,
  ISingleProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { IErrorResponse } from 'shared/interfaces/utils/IErrorResonse';
import { IMediaFileType } from 'shared/interfaces/utils/IMediaFileType';

const {
  getProfiles: getProfilesDao,
  getSingleProfile: getSingleProfileDao,
  getProfileTabDetail: getProfileTabDetailDao,
  createProfile: createProfileDao,
  updateProfile: updateProfileDao,
  getProfilePrimaryImage: getProfilePrimaryImageDao,
  setProfilePrimaryImage: setProfilePrimaryImageDao,
  getProfileMedia: getProfileMediaDao,
  setSelectProfileMedia: setSelectProfileMediaDao,
  unSelectProfileMedia: unSelectProfileMediaDao,
  updateProfileMediaSort: updateProfileMediaSortDao,
} = profileDao();
export const profileService = () => {
  const getProfiles = () => {
    return useQuery<IProfileResponsePayload, Error>(['profiles'], () => getProfilesDao());
  };

  const getSingleProfile = (id: string) => {
    return useQuery<ISingleProfileResponsePayload, Error>(['profile', id], () => getSingleProfileDao(id));
  };

  const getProfileTabDetail = (id: string, tab: string) => {
    return useQuery<IProfileTabDetailReponsePayload, AxiosError<IErrorResponse>>(['profile_tab', id, tab], () =>
      getProfileTabDetailDao(id, tab),
    );
  };

  const createProfile = () => {
    return useMutation<IProfileCreateResponsePayload, AxiosError<IErrorResponse>, IProfileCreatePayload>(
      (payload: IProfileCreatePayload) => createProfileDao(payload),
    );
  };

  const updateProfile = () => {
    return useMutation(({ profileId, payload }: { profileId: string; payload: IProfileUpdatePayload }) =>
      updateProfileDao(profileId, payload),
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
        onProgress?: (current: number) => void;
      }) => setProfilePrimaryImageDao(profileId, formData, onProgress),
    );
  };

  const getMediaProfile = (profileId: string, fileType: IMediaFileType) => {
    return useQuery(['profile_media', profileId, fileType], () => getProfileMediaDao(profileId, fileType));
  };

  const setSelectProfileMedia = () => {
    return useMutation<
      IProfileResponsePayload,
      AxiosError<IErrorResponse>,
      { profileId: string; payload: IProfileMediaSetSelectPayload }
    >(({ profileId, payload }: { profileId: string; payload: IProfileMediaSetSelectPayload }) =>
      setSelectProfileMediaDao(profileId, payload),
    );
  };

  const unSelectProfileMedia = () => {
    return useMutation<
      IProfileResponsePayload,
      AxiosError<IErrorResponse>,
      { profileId: string; profileMediaId: string }
    >(({ profileId, profileMediaId }: { profileId: string; profileMediaId: string }) =>
      unSelectProfileMediaDao(profileId, profileMediaId),
    );
  };

  const updateProfileMediaSort = () => {
    return useMutation(({ profileId, sort }: { profileId: string; sort: { id: string; sort: number }[] }) =>
      updateProfileMediaSortDao(profileId, sort),
    );
  };

  return {
    getProfiles,
    getSingleProfile,
    getProfileTabDetail,
    createProfile,
    updateProfile,
    getProfilePrimaryImage,
    setProfilePrimaryImage,
    getMediaProfile,
    setSelectProfileMedia,
    unSelectProfileMedia,
    updateProfileMediaSort,
  };
};

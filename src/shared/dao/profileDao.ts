import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfileMediaResponsePayload,
  IProfileMediaSetSelectPayload,
  IProfilePrimaryImageResponsePayload,
  IProfileResponsePayload,
  IProfileTabDetailReponsePayload,
  IProfileUpdatePayload,
  ISingleProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { IMediaFileType } from 'shared/interfaces/utils/IMediaFileType';
import { authToken } from 'shared/utils/authToken';

const { GET, POST, DELETE, PATCH } = useAxios();

export const profileDao = () => {
  const { getAuthToken } = authToken();
  const getProfiles = async () => {
    const response = await GET<IProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const getSingleProfile = async (id: string) => {
    const response = await GET<ISingleProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${id}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const getProfileTabDetail = async (id: string, tab: string) => {
    const response = await GET<IProfileTabDetailReponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${id}/${tab}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const createProfile = async (payload: IProfileCreatePayload) => {
    const response = await POST<IProfileCreateResponsePayload>({
      url: `${ENDPOINTS.PROFILE}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const updateProfile = async (id: string, payload: IProfileUpdatePayload) => {
    const response = await PATCH({
      url: `${ENDPOINTS.PROFILE}/${id}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const getProfilePrimaryImage = async (profileId: string) => {
    const response = await GET<IProfilePrimaryImageResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/primary_image`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const setProfilePrimaryImage = async (
    profileId: string,
    formData: FormData,
    onProgress?: (current: number) => void,
  ) => {
    const response = await POST<IProfilePrimaryImageResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/primary_image`,
      data: formData,
      onUploadProgress: (progressEvent) => {
        if (onProgress) {
          onProgress((progressEvent.loaded / progressEvent.total) * 100);
        }
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const getProfileMedia = async (profileId: string, fileType: IMediaFileType) => {
    const response = await GET<IProfileMediaResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/medium_attachments`,
      params: fileType,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  const setSelectProfileMedia = async (profileId: string, payload: IProfileMediaSetSelectPayload) => {
    const response = await POST<IProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/medium_attachments`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const unSelectProfileMedia = async (profileId: string, profileMediaId: string) => {
    const response = await DELETE<IProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/medium_attachments/${profileMediaId}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const updateProfileMediaSort = async (profileId: string, sort: { id: string; sort: number }[]) => {
    const response = await PATCH<IProfileResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/medium_attachments/sort`,
      data: {
        sorted_medium_attachments: sort,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getProfiles,
    getSingleProfile,
    getProfileTabDetail,
    createProfile,
    updateProfile,
    getProfilePrimaryImage,
    setProfilePrimaryImage,
    getProfileMedia,
    setSelectProfileMedia,
    unSelectProfileMedia,
    updateProfileMediaSort,
  };
};

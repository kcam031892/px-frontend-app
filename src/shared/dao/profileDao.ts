import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  IProfileCreatePayload,
  IProfileCreateResponsePayload,
  IProfilePrimaryImageResponsePayload,
  IProfileResponsePayload,
  ISingleProfileResponsePayload,
} from 'shared/interfaces/IProfile';
import { authToken } from 'shared/utils/authToken';

const { GET, POST } = useAxios();

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
    onProgress: (current: number) => void,
  ) => {
    const response = await POST<IProfilePrimaryImageResponsePayload>({
      url: `${ENDPOINTS.PROFILE}/${profileId}/primary_image`,
      data: formData,
      onUploadProgress: (progressEvent) => {
        onProgress((progressEvent.loaded / progressEvent.total) * 100);
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
    createProfile,
    getProfilePrimaryImage,
    setProfilePrimaryImage,
  };
};

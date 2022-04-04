import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import {
  ITalentBiographyResponsePayload,
  ITalentResumeResponsePayload,
  ITalentUpdatePayload,
} from 'shared/interfaces/ITalent';
import { authToken } from 'shared/utils/authToken';

const { GET, PATCH } = useAxios();
export const talentDao = () => {
  const { getAuthToken } = authToken();
  const updateTalent = async (payload: ITalentUpdatePayload) => {
    const response = await PATCH({
      url: `${ENDPOINTS.TALENTS}`,
      data: payload,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };
  const getResume = async () => {
    const response = await GET<ITalentResumeResponsePayload>({
      url: `${ENDPOINTS.TALENTS}/resume`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  const getBiography = async () => {
    const response = await GET<ITalentBiographyResponsePayload>({
      url: `${ENDPOINTS.TALENTS}/biography`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    getResume,
    getBiography,
    updateTalent,
  };
};

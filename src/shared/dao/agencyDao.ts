import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { IAgencyResponsePayload } from 'shared/interfaces/utils/IAgency';
import { authToken } from 'shared/utils/authToken';

const { GET } = useAxios();
const { getAuthToken } = authToken();
export const agencyDao = () => {
  const searchAgency = async (country: string, query: string) => {
    const response = await GET<IAgencyResponsePayload>({
      url: `${ENDPOINTS.AGENCY}/search`,
      params: {
        country,
        query,
      },
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  };

  return {
    searchAgency,
  };
};

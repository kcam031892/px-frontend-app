import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { useAxios } from 'shared/hooks/useAxios';
import { IStatisticsResponsePayload } from 'shared/interfaces/IStatistics';
import { authToken } from 'shared/utils/authToken';

const { GET, PATCH } = useAxios();

export const statisticsDao = () => {
  const { getAuthToken } = authToken();
  const getStatistics = async () => {
    const response = await GET<IStatisticsResponsePayload>({
      url: `${ENDPOINTS.ME}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  return {
    getStatistics,
  };
};

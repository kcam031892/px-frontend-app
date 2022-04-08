import { useMutation, useQuery } from 'react-query';
import { statisticsDao } from 'shared/dao/statisticsDao';
import { IStatisticsResponsePayload } from 'shared/interfaces/IStatistics';

const { getStatistics: getStatisticsDao } = statisticsDao();
export const statisticsService = () => {
  const getStatistics = () => {
    return useQuery<IStatisticsResponsePayload, Error>(['accounts'], () => getStatisticsDao());
  };

  return {
    getStatistics,
  };
};

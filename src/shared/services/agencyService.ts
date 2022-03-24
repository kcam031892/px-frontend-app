import { useQuery } from 'react-query';
import { agencyDao } from 'shared/dao/agencyDao';
import { IAgencyResponsePayload } from 'shared/interfaces/utils/IAgency';

const { searchAgency: searchAgencyDao } = agencyDao();
export const agencyService = () => {
  const searchAgency = (country: string, query: string) => {
    return useQuery<IAgencyResponsePayload, Error>(['agency', country, query], () => searchAgencyDao(country, query), {
      enabled: !!country && !!query,
    });
  };

  return {
    searchAgency,
  };
};

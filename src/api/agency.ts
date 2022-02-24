import axios from 'axios';
import { AgencySerachViewModel } from '../features/talent/profileTypes';
import { DataResult } from '../types';
import { AxiosConfig } from '../utils/axiosConfig';

export async function searchAgencyByNameAndCountry(
  agencyName: string,
  countryCode: string,
): Promise<AgencySerachViewModel[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/agency/search?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&agencyName=${agencyName}&countryCode=${countryCode}`;

  try {
    AxiosConfig.enableInterceptors = false;
    const response = await axios.get<DataResult<AgencySerachViewModel[]>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  } finally {
    AxiosConfig.enableInterceptors = true;
  }
}

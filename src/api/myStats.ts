import axios from 'axios';
import { StatsModel } from '../features/settings/stats/statsTypes';
import { AgeType, DataResult, Result, SizeUnit } from '../types/commonTypes';

export async function getMyStats(
  memberId: string,
  countryCode?: string,
  gender?: string,
  ageType?: AgeType,
  sizeUnit?: SizeUnit,
): Promise<StatsModel> {
  let url = `${process.env.REACT_APP_API_URL}/api/v2/stats/getStats?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;
  if (countryCode) {
    url = `${url}&countryCode=${countryCode}`;
  }

  if (gender) {
    url = `${url}&gender=${gender}`;
  }

  if (ageType !== null) {
    url = `${url}&ageType=${ageType}`;
  }

  if (sizeUnit) {
    url = `${url}&sizeUnit=${sizeUnit}`;
  }

  try {
    const response = await axios.get<DataResult<StatsModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postStats(myStats: StatsModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/stats/saveStats?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, myStats);
    return response.data;
  } catch (err) {
    throw err;
  }
}

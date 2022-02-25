import axios from 'axios';
import { BiographyModel } from '../features/talent/biography/biographyTypes';
import { DataResult, Result } from '../types/commonTypes';

export async function getBiography(profileId: string): Promise<BiographyModel> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/profile/biography/${profileId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<BiographyModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function saveBiography(biography: BiographyModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/profile/biography?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, biography);
    return response.data;
  } catch (err) {
    throw err;
  }
}

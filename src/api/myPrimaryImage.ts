import axios from 'axios';
import { PrimaryImageModel } from '../features/talent/primaryImage/primaryImageTypes';
import { DataResult, Result } from '../types/commonTypes';

export async function getPrimaryImage(profileId: string): Promise<PrimaryImageModel> {
  const url =
    `${process.env.REACT_APP_API_URL}/api/v2/primaryImage/GetPrimaryImage` +
    `?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&profileIdStr=${profileId}`;

  try {
    const response = await axios.get<DataResult<PrimaryImageModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function savePrimaryImage(primaryImage: PrimaryImageModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/primaryImage?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, primaryImage);
    return response.data;
  } catch (err) {
    throw err;
  }
}

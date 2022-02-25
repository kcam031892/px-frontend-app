import axios from 'axios';
import { ResumeModel } from '../features/talent/resume/ResumeTypes';
import { DataResult, Result } from '../types/commonTypes';

export async function getResume(profileId: string): Promise<ResumeModel> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/profile/resume/${profileId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<ResumeModel>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function postResume(resume: ResumeModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/profile/resume?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, resume);
    return response.data;
  } catch (err) {
    throw err;
  }
}

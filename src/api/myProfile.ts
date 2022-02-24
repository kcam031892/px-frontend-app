import axios from 'axios';
import { RepresentationRequestViewModel } from '../features/account/accountTypes';
import { MediaConvertJobDetailModel, UploadResultModel } from '../features/media/uploadTypes';
import { ProfileViewModel, RepresentationRequestType } from '../features/talent/profileTypes';
import { DataResult, Result } from '../types/commonTypes';
import { AxiosConfig } from '../utils/axiosConfig';

export async function getProfiles(memberId: string): Promise<ProfileViewModel[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/profiles/${memberId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<ProfileViewModel[]>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function deleteProfile(memberProfileId: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/deleteProfile/${memberProfileId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function changePrimary(memberProfileId: string): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/changePrimary/${memberProfileId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function changePresentation(
  memberProfileId: string,
  agencyId: number,
  requestType: RepresentationRequestType,
  note: string,
): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/changeProfile?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.post<Result>(url, {
      memberProfileId: memberProfileId,
      requestType: requestType,
      agencyId: agencyId,
      note: note,
    });
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function acceptPresentation(requestId: string): Promise<DataResult<RepresentationRequestViewModel>> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/representation/accept/${requestId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<RepresentationRequestViewModel>>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function denyPresentation(requestId: string): Promise<DataResult<RepresentationRequestViewModel>> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/representation/deny/${requestId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.get<DataResult<RepresentationRequestViewModel>>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function uploadFile(
  memberId: string,
  formData: FormData,
  onUploadProgress: any,
): Promise<DataResult<UploadResultModel>> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/file/upload?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;

  try {
    AxiosConfig.enableInterceptors = false;
    const response = await axios.post<DataResult<UploadResultModel>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
    return response.data;
  } catch (err) {
    throw err;
  } finally {
    AxiosConfig.enableInterceptors = true;
  }
}

export async function fetchJobStatus(
  jobInfo: MediaConvertJobDetailModel,
): Promise<DataResult<MediaConvertJobDetailModel>> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/mediaJobStatus?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    AxiosConfig.enableInterceptors = false;
    const response = await axios.post<DataResult<MediaConvertJobDetailModel>>(url, jobInfo);
    return response.data;
  } catch (err) {
    throw err;
  } finally {
    AxiosConfig.enableInterceptors = true;
  }
}

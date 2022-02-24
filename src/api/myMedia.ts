import axios from 'axios';
import { MediaModel, MediaUpdateModel, PhotoModel, PhotoUpdateModel } from '../features/media/mediaTypes';
import { DataResult, MediaType, Result } from '../types/commonTypes';

export async function getPhotos(memberId: string): Promise<PhotoModel[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/photos?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}`;

  try {
    const response = await axios.get<DataResult<PhotoModel[]>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function getMediaTags(mediaType: MediaType): Promise<string[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/tags?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&mediaType=${mediaType}`;

  try {
    const response = await axios.get<DataResult<string[]>>(url);
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function updatePhoto(photo: PhotoUpdateModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/photos?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.put<Result>(url, photo);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function deletePhoto(photoId: number): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/photos/${photoId}?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.delete<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function getMedia(memberId: string, mediaType: MediaType): Promise<MediaModel[]> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/media?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&memberId=${memberId}&mediaType=${mediaType}`;
  try {
    const response = await axios.get<DataResult<MediaModel[]>>(url);
    const resultData = response.data.data || [];
    return response.data.data;
  } catch (err) {
    throw err;
  }
}

export async function updateMedia(media: MediaUpdateModel): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/media?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE`;

  try {
    const response = await axios.put<Result>(url, media);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function setThumbnail(seek: number, mediaId: number): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/media/setThumbnail?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&seek=${seek}&mediaId=${mediaId}`;

  try {
    const response = await axios.get<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

export async function cutMedia(from: number, to: number, mediaId: number): Promise<Result> {
  const url = `${process.env.REACT_APP_API_URL}/api/v2/media/cutMedia?apikey=RUUxMTREOTAtQkZEOS00OTExLTlGRjAtMjRFNURGMzYzREJE&from=${from}&to=${to}&mediaId=${mediaId}`;

  try {
    const response = await axios.get<Result>(url);
    return response.data;
  } catch (err) {
    throw err;
  }
}

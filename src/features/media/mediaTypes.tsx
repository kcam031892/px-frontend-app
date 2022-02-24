import { MediaType } from '../../types';

export interface PhotoModel {
  photoId: number;
  memberId: string;
  name: string;
  size: number;
  dimensionHeight: number;
  dimensionWidth: number;
  croppedDimensionHeight: number;
  croppedDimensionWidth: number;
  fileUrl: string;
  originalFileUrl: string;
  visibility: boolean;
  lastModifiedTime: Date;
  createdTime: Date;
  tags: string[];
}

export interface MediaModel {
  mediaId: number;
  memberId: string;
  name: string;
  size: number;
  originalDuration: number;
  duration: number;
  thumbnail: string;
  fileUrl: string;
  originalFileUrl: string;
  visibility: boolean;
  lastModifiedTime: Date;
  createdTime: Date;
  tags: string[];
}

export interface MediaState {
  photos: PhotoModel[];
  photoTags: string[];
  videos: MediaModel[];
  videoTags: string[];
  audios: MediaModel[];
  audioTags: string[];
  photoPackageCount: number;
  videoPackageDuration: number;
  audioPackageDuration: number;
}

export interface MediaUpdateModel {
  mediaId: number;
  mediaType: MediaType;
  tags?: string[];
  start?: number;
  end?: number;
  name?: string;
  visibility?: boolean;
}

export interface PhotoUpdateModel {
  photoId: number;
  tags?: string[];
  image?: string;
  name?: string;
  visibility?: boolean;
}

export interface MediaFilter {
  name: string;
  option: MediaFilterOption;
  tags: string[];
}

export enum MediaFilterOption {
  ALL,
  UNUSED,
  UNTAGGED,
}

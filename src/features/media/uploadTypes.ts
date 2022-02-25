import { MediaType } from '../../types';

export interface FileUploadModel {
  id: string;
  fileName: string;
  progress: number;
  status: UploadStatus;
  mediaJobDetail?: MediaConvertJobDetailModel;
  mediaType?: MediaType;
  fileType: string;
  fileSize: number;
  fileUrl?: string;
}

export enum UploadStatus {
  Uploading,
  Encoding,
  Completed,
}

export interface FileUploadState {
  model: FileUploadModel[];
}

export interface UploadResultModel {
  mediaType: MediaType;
  mediaJob?: MediaConvertJobDetailModel;
  finalFileUrl?: string;
}

export interface MediaConvertJobDetailModel {
  memberId: string;
  mediaType: MediaType;
  fileIdentifier: string;
  status: number;
  jobId: number;
  outputId: number;
  encodingState: string;
  encodingProgress: number;
  fileName: string;
}

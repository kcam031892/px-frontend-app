export interface IAttributes {
  attachment_url: string;
  modified_attachment_url: string;
  file_type: 'image' | 'video' | 'audio';
  id: string;
  tag_list: string[];
  file_name: string;
  file_size: number;
  file_width: number;
  file_height: number;
  width?: string;
  height?: string;
}

export interface IMediaResponse {
  data: IMedia[];
  meta: IMeta;
}

export interface IMediaRequestPayload {
  file_type?: 'image' | 'video' | 'audio';
}

export interface IMediaAggregatesResponse {
  data: IAggregates;
}

interface IMedia {
  attributes: IAttributes;
  id: string;
  type: string;
}

export interface IAggregates {
  images_count: number;
  videos_count: number;
  audios_count: number;
  documents_count: number;
  storage_size_used: number;
  images_limit: string;
  videos_limit: string;
  audios_limit: string;
  documents_limit: string;
  storage_size_limit: string;
}

export interface IMeta {
  tags: [];
  total: number;
}

export interface IRetrieveMultipleMediaUrlResponsePayload {
  data: {
    id: string;
    url: string;
  }[];
}

export default IMedia;

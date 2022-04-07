export interface IAttributes {
  attachment_url: string;
  file_type: 'image' | 'video' | 'audio';
  id: string;
  tag_list: string[];
  file_name: string;
  file_size: number;
  width?: string;
  height?: string;
}

export interface IMediaResponse {
  data: IMedia[];
  meta: IMeta;
}

interface IMedia {
  attributes: IAttributes;
  id: string;
  type: string;
}

export interface IMeta {
  tags: [];
  total: number;
}

export default IMedia;

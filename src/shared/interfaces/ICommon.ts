export interface ICommon {
  created_at: Date;
  updated_at: Date;
}

export interface ICommonResponsePayload {
  id: string;
  type: string;
}
export interface ICommonCreateResponsePayload {
  message: string;
}

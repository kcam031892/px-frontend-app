export interface BiographyModel {
  profileId: string;
  content: string;
}

export interface BiographyState {
  model: BiographyModel;
  tempContent?: string;
}

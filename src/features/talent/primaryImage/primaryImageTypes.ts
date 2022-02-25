export interface PrimaryImageModel {
  profileId: string;
  profilePhotoId: number;
  photoName: string;
  photoTags: string[];
  tagOptions: string[];
  image: string;
  originalImage: string;
}

export interface PrimaryImageState {
  model: PrimaryImageModel;
  loadComplete: boolean;
}

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  cutMedia,
  deletePhoto,
  getMedia,
  getMediaTags,
  getPhotos,
  setThumbnail,
  updateMedia,
  updatePhoto,
} from '../../api/myMedia';
import { AppThunk } from '../../app/store';
import { MediaType, ResultType } from '../../types';
import { MediaState, PhotoModel, PhotoUpdateModel, MediaModel, MediaUpdateModel } from './mediaTypes';

const initialState: MediaState = {
  photos: [],
  photoTags: [],
  videos: [],
  videoTags: [],
  audios: [],
  audioTags: [],
  photoPackageCount: 5,
  videoPackageDuration: 20,
  audioPackageDuration: 20,
};

interface TagRequestPayloadAction {
  tags: string[];
  mediaType: MediaType;
}

interface MediaLoadPayloadAction {
  media: MediaModel[];
  mediaType: MediaType;
}

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    completeLoadPhotos(state: MediaState, action: PayloadAction<PhotoModel[]>) {
      state.photos = action.payload;
    },

    completedLoadMedia(state: MediaState, action: PayloadAction<MediaLoadPayloadAction>) {
      if (action.payload.mediaType === MediaType.VIDEO) {
        const videos = [...action.payload.media];
        state.videos = videos;
      } else if (action.payload.mediaType === MediaType.AUDIO) {
        state.audios = action.payload.media;
      }
    },

    completeLoadTags(state: MediaState, action: PayloadAction<TagRequestPayloadAction>) {
      if (action.payload.mediaType === MediaType.IMAGE) {
        state.photoTags = action.payload.tags;
      } else if (action.payload.mediaType === MediaType.VIDEO) {
        state.videoTags = action.payload.tags;
      } else if (action.payload.mediaType === MediaType.AUDIO) {
        state.audioTags = action.payload.tags;
      }
    },
  },
});

export const { completeLoadPhotos, completeLoadTags, completedLoadMedia } = mediaSlice.actions;

export default mediaSlice.reducer;

export const queryPhotos =
  (memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await getPhotos(memberId);
      dispatch(completeLoadPhotos(result));
    } catch (err) {}
  };

export const queryTags =
  (mediaType: MediaType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await getMediaTags(mediaType);
      dispatch(completeLoadTags({ tags: result, mediaType: mediaType }));
    } catch (err) {}
  };

export const deleteOnePhoto =
  (photoId: number, memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      await deletePhoto(photoId);
      dispatch(queryPhotos(memberId));
    } catch (err) {}
  };

export const savePhotoInfo =
  (memberId: string, photoId: number, name: string, visibility: boolean, tags: string[]): AppThunk =>
  async (dispatch) => {
    try {
      const updateModel: PhotoUpdateModel = {
        photoId: photoId,
        name: name,
        visibility: visibility,
        tags: tags,
      };
      await updatePhoto(updateModel);
      dispatch(queryPhotos(memberId));
      dispatch(queryTags(MediaType.IMAGE));
    } catch (err) {}
  };

export const savePhotoImage =
  (memberId: string, photoId: number, image: string): AppThunk =>
  async (dispatch) => {
    try {
      const updateModel: PhotoUpdateModel = {
        photoId: photoId,
        image: image,
      };
      await updatePhoto(updateModel);
      dispatch(queryPhotos(memberId));
    } catch (err) {}
  };

export const queryMedia =
  (memberId: string, mediaType: MediaType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await getMedia(memberId, mediaType);
      dispatch(
        completedLoadMedia({
          mediaType: mediaType,
          media: result,
        }),
      );
    } catch (err) {}
  };

export const saveMediaInfo =
  (
    memberId: string,
    mediaId: number,
    mediaType: MediaType,
    name: string,
    visibility: boolean,
    tags: string[],
  ): AppThunk =>
  async (dispatch) => {
    try {
      const updateModel: MediaUpdateModel = {
        mediaId: mediaId,
        mediaType: mediaType,
        name: name,
        visibility: visibility,
        tags: tags,
      };
      await updateMedia(updateModel);
      dispatch(queryMedia(memberId, mediaType));
      dispatch(queryTags(mediaType));
    } catch (err) {}
  };

export const setMediaThumbnail =
  (memberId: string, seek: number, mediaId: number): AppThunk =>
  async (dispatch) => {
    try {
      const result = await setThumbnail(seek, mediaId);
      if (result.type === ResultType.success) {
        dispatch(queryMedia(memberId, MediaType.VIDEO));
      }
    } catch (err) {}
  };

export const cropMedia =
  (memberId: string, from: number, to: number, mediaId: number, mediaType: MediaType): AppThunk =>
  async (dispatch) => {
    try {
      const result = await cutMedia(from, to, mediaId);
      if (result.type === ResultType.success) {
        dispatch(queryMedia(memberId, mediaType));
      }
    } catch (err) {}
  };

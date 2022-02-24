import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { getPrimaryImage, savePrimaryImage } from '../../../api/myPrimaryImage';
import { AppThunk } from '../../../app/store';
import { PrimaryImageModel, PrimaryImageState } from './primaryImageTypes';

const initialState: PrimaryImageState = {
  model: {
    profileId: '',
    profilePhotoId: 0,
    photoName: '',
    photoTags: [],
    tagOptions: [],
    image: '',
    originalImage: '',
  },
  loadComplete: false,
};

const primaryImageSlice = createSlice({
  name: 'primaryImage',
  initialState,
  reducers: {
    loadDataSuccess(state: PrimaryImageState, action: PayloadAction<PrimaryImageModel>) {
      state.model = action.payload;
      state.loadComplete = true;
    },

    selectImage(state: PrimaryImageState, action: PayloadAction<string>) {
      state.model.originalImage = action.payload;
    },

    selectTag(state: PrimaryImageState, action: PayloadAction<string>) {
      const tags = state.model.photoTags || [];
      if (tags.findIndex((x) => x === action.payload) < 0) {
        state.model.photoTags = [...tags, action.payload];
      }
    },

    deleteTag(state: PrimaryImageState, action: PayloadAction<string>) {
      const tags = [...state.model.photoTags];
      _.remove(tags, (x) => x === action.payload);
      state.model.photoTags = tags;
    },

    cropImage(state: PrimaryImageState, action: PayloadAction<string>) {
      state.model.image = action.payload;
    },

    nameChange(state: PrimaryImageState, action: PayloadAction<string>) {
      state.model.photoName = action.payload;
    },
  },
});

export const { loadDataSuccess, selectImage, selectTag, deleteTag, cropImage, nameChange } = primaryImageSlice.actions;

export default primaryImageSlice.reducer;

export const fetchPrimaryImage =
  (profileId: string): AppThunk =>
  async (dispatch) => {
    try {
      const primaryImage = await getPrimaryImage(profileId);
      dispatch(loadDataSuccess(primaryImage));
    } catch (err) {}
  };

export const postPrimaryImage =
  (primaryImage: PrimaryImageModel): AppThunk =>
  async (dispatch) => {
    try {
      await savePrimaryImage(primaryImage);
    } catch (err) {}
  };

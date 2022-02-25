import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getBiography, saveBiography } from '../../../api/myBiography';
import { AppThunk } from '../../../app/store';
import { BiographyModel, BiographyState } from './biographyTypes';

const initialState: BiographyState = {
  model: {
    profileId: '',
    content: '',
  },
  tempContent: '',
};

const biographySlic = createSlice({
  name: 'biography',
  initialState,
  reducers: {
    loadDataSuccess(state: BiographyState, action: PayloadAction<BiographyModel>) {
      state.model = action.payload;
      state.tempContent = state.model.content;
    },

    changeBiographyContent(state: BiographyState, action: PayloadAction<string>) {
      state.tempContent = action.payload;
    },

    cancelBiographyChange(state: BiographyState) {
      state.tempContent = state.model.content;
    },

    saveChangeComplete(state: BiographyState) {
      state.model.content = state.tempContent || '';
    },
  },
});

export const { loadDataSuccess, changeBiographyContent, cancelBiographyChange, saveChangeComplete } =
  biographySlic.actions;

export default biographySlic.reducer;

export const fetchProfileBiography =
  (profileId: string): AppThunk =>
  async (dispatch) => {
    try {
      const biography = await getBiography(profileId);
      dispatch(loadDataSuccess(biography));
    } catch (err) {}
  };

export const saveProfileBiography =
  (biography: BiographyModel): AppThunk =>
  async (dispatch) => {
    try {
      await saveBiography(biography);
      dispatch(saveChangeComplete());
    } catch (err) {}
  };

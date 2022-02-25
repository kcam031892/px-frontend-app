import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getSocial } from '../../../api/myAccount';
import { AppThunk } from '../../../app/store';
import { MySocialState, SocialModel, SocialTypeCode } from './socialTypes';

export interface ChangeSocialVisblePayload {
  code: SocialTypeCode;
  visible: boolean;
}

export interface ChangeSocialLinkPayload {
  code: SocialTypeCode;
  link: string;
}

const initialState: MySocialState = {
  models: [],
};

const mySocialSlice = createSlice({
  name: 'mySocial',
  initialState,
  reducers: {
    loadDataSuccess(state: MySocialState, action: PayloadAction<SocialModel[]>) {
      state.models = action.payload;
    },
    changeSocialVisible(state: MySocialState, action: PayloadAction<ChangeSocialVisblePayload>) {
      const social = state.models.find((x) => x.socialTypeCode === action.payload.code);
      if (social) {
        social.show = action.payload.visible;
      }
    },
    changeSocialLink(state: MySocialState, action: PayloadAction<ChangeSocialLinkPayload>) {
      const social = state.models.find((x) => x.socialTypeCode === action.payload.code);
      if (social) {
        social.link = action.payload.link;
      }
    },
  },
});

export const { loadDataSuccess, changeSocialVisible, changeSocialLink } = mySocialSlice.actions;

export default mySocialSlice.reducer;

export const fetchSocial =
  (memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      const socials = await getSocial(memberId);
      dispatch(loadDataSuccess(socials));
    } catch (err) {}
  };

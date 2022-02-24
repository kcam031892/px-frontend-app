import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { searchAgencyByNameAndCountry } from '../../api/agency';
import { changePresentation, changePrimary, deleteProfile, getProfiles } from '../../api/myProfile';
import { AppThunk } from '../../app/store';
import { ResultType } from '../../types';
import { AgencySerachViewModel, ProfileState, ProfileViewModel, RepresentationRequestType } from './profileTypes';

const initialState: ProfileState = {
  profiles: [],
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    loadDataSuccess(state: ProfileState, action: PayloadAction<ProfileViewModel[]>) {
      state.profiles = action.payload;
    },

    deleteProfileComplete(state: ProfileState, action: PayloadAction<string>) {
      state.profiles = state.profiles.filter((x) => x.profileId !== action.payload);
    },

    changePrimaryComplete(state: ProfileState, action: PayloadAction<string>) {
      const primaryProfile = state.profiles.find((x) => x.isPrimary);
      const currentPrimaryProfile = state.profiles.find((x) => x.profileId === action.payload);
      if (primaryProfile) {
        primaryProfile.isPrimary = false;
      }
      if (currentPrimaryProfile) {
        currentPrimaryProfile.isPrimary = true;
      }
    },

    completeAgencySearch(state: ProfileState, action: PayloadAction<AgencySerachViewModel[]>) {
      state.agencies = action.payload;
    },
  },
});

export const { loadDataSuccess, deleteProfileComplete, changePrimaryComplete, completeAgencySearch } =
  profileSlice.actions;

export default profileSlice.reducer;

export const fetchMyProfiles =
  (memberId: string): AppThunk =>
  async (dispatch) => {
    try {
      const myProfiles = await getProfiles(memberId);
      dispatch(loadDataSuccess(myProfiles));
    } catch (err) {}
  };

export const deleteMyProfile =
  (profileId: string): AppThunk =>
  async (dispatch) => {
    try {
      await deleteProfile(profileId);
      dispatch(deleteProfileComplete(profileId));
    } catch (err) {}
  };

export const changeProfilePrimary =
  (profileId: string): AppThunk =>
  async (dispatch) => {
    try {
      await changePrimary(profileId);
      dispatch(changePrimaryComplete(profileId));
    } catch (err) {}
  };

export const searchAgency =
  (name: string, countryCode: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await searchAgencyByNameAndCountry(name, countryCode);
      dispatch(completeAgencySearch(result));
    } catch (err) {}
  };

export const changePresentationRequest =
  (
    memberId: string,
    memberProfileId: string,
    agencyId: number,
    requestType: RepresentationRequestType,
    note: string,
  ): AppThunk =>
  async (dispatch) => {
    try {
      const result = await changePresentation(memberProfileId, agencyId, requestType, note);
      if (result.type === ResultType.success) {
        const myProfiles = await getProfiles(memberId);
        dispatch(loadDataSuccess(myProfiles));
      }
    } catch (err) {}
  };

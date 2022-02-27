/* eslint-disable */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { signUp, signUpConfirm } from '../../api/myAccount';
import { acceptPresentation, denyPresentation } from '../../api/myProfile';
import { AppThunk } from '../../app/store';
import { Result, ResultType } from '../../types';
import { AccountState, RepresentationRequestViewModel } from './accountTypes';
import { SignUpState } from './signUp';

const initialState: AccountState = {
  signUpSuccess: false,
  signUpConfirmSuccess: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    resetState(state: AccountState) {
      state = initialState;
    },
    completeSignUp(state: AccountState, action: PayloadAction<Result>) {
      if (action.payload.type === ResultType.success) {
        state.signUpSuccess = true;
      }
    },
    completeSignUpConfirm(state: AccountState, action: PayloadAction<Result>) {
      if (action.payload.type === ResultType.success) {
        state.signUpConfirmSuccess = true;
      }
    },
    completeRepresentationRequest(state: AccountState, action: PayloadAction<RepresentationRequestViewModel>) {
      state.representationRequest = action.payload;
    },
  },
});

export const { resetState, completeSignUp, completeSignUpConfirm, completeRepresentationRequest } =
  accountSlice.actions;

export default accountSlice.reducer;

export const postSignUp =
  (signUpData: SignUpState): AppThunk =>
  async (dispatch) => {
    try {
      const result = await signUp(signUpData);
      dispatch(completeSignUp(result));
    } catch (err) {}
  };

export const confirmSignUp =
  (code: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await signUpConfirm(code);
      dispatch(completeSignUpConfirm(result));
    } catch (err) {}
  };

export const acceptPresentationRequest =
  (requestId: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await acceptPresentation(requestId);
      dispatch(completeRepresentationRequest(result.data));
    } catch (err) {}
  };

export const denyPresentationRequest =
  (requestId: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await denyPresentation(requestId);
      dispatch(completeRepresentationRequest(result.data));
    } catch (err) {}
  };

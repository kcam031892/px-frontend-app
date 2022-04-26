import hS from 'humanize-string';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { authDao } from 'shared/dao/authDao';
import {
  IForgotPasswordRequestPayload,
  IResetPasswordRequestPayload,
  ISignInRequestPayload,
  ISignUpRequestPayload,
  IUser,
} from 'shared/interfaces/IUser';
import { ls } from 'shared/utils/ls';

import { AppThunk, RootState } from '../store';
import { ROUTES } from 'shared/constants/ROUTES';

const {
  loginWithGoogle,
  loginWithFacebook,
  logout,
  getUserProfile: getUserProfileService,
  login,
  signup,
  sendEmail,
  resetPassword,
} = authDao();

const { setLS, removeLS } = ls();

export interface UserState {
  isLoading: boolean;
  user: IUser | null;
  errorMessage: string | null;
  responseMessage: string | null;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  isLoading: false,
  user: null,
  errorMessage: null,
  responseMessage: null,
  isLoggedIn: false,
};
export const userSlicer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state: UserState, action: PayloadAction<{ user: IUser }>) {
      state.user = action.payload.user;
    },
    setIsLoading(state: UserState, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
    setErrorMessage(state: UserState, action: PayloadAction<string | null>) {
      state.errorMessage = action.payload;
    },
    setResponseMessage(state: UserState, action: PayloadAction<string | null>) {
      state.responseMessage = action.payload;
    },
    setIsLoggedIn(state: UserState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    handleCompleteProfileSuccess(state: UserState, action: PayloadAction<{ user: IUser }>) {
      const { user } = action.payload;
      setLS('is_completed_primary_details', true);
      state.isLoggedIn = true;
      state.user = user;
    },
    handleAuthExpired(state: UserState) {
      removeLS('auth_token');
      state.errorMessage = null;
      state.isLoggedIn = false;
    },
  },
});

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;

export const {
  setUser,
  setIsLoading,
  setErrorMessage,
  setResponseMessage,
  setIsLoggedIn,
  handleAuthExpired,
  handleCompleteProfileSuccess,
} = userSlicer.actions;
export default userSlicer.reducer;

export const userLogin =
  (payload: ISignInRequestPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const {
        data: { data: user, token },
      } = await login(payload);
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      setLS('is_completed_primary_details', user.attributes.completed_primary_details);
      dispatch(setUser({ user }));
      dispatch(setIsLoggedIn(true));
      dispatch(setErrorMessage(null));
      return user;
    } catch (err: any) {
      dispatch(setErrorMessage(err.response.data.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const userSignup =
  (payload: ISignUpRequestPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const {
        data: { data: user, token },
      } = await signup(payload);
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));

      dispatch(setUser({ user }));
      dispatch(setIsLoggedIn(true));
      dispatch(setErrorMessage(null));
      setLS('is_completed_primary_details', user.attributes.completed_primary_details);
      return user;
    } catch (err: any) {
      const { errors = {} } = err.response.data;
      const errMsg = [];
      for (const key in errors) {
        const errArr = errors[key];
        errMsg.push(`${hS(key)} ${errArr.join('. ')}`);
      }
      dispatch(setErrorMessage(`${errMsg.join('. ')}.`));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const userSendEmail =
  (payload: IForgotPasswordRequestPayload, history: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const {
        data: { message = 'Email successfully sent' },
      } = await sendEmail(payload);

      dispatch(setResponseMessage(message));
      history.push(ROUTES.LOGIN);
      return message;
    } catch (err: any) {
      const { errors = '' } = err.response.data;
      dispatch(setErrorMessage(errors));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const userResetPassword =
  (payload: IResetPasswordRequestPayload, history: any): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const {
        data: { message = 'Password successfully updated' },
      } = await resetPassword(payload);

      dispatch(setResponseMessage(message));
      history.push(ROUTES.LOGIN);
      return message;
    } catch (err: any) {
      const { errors = {} } = err.response.data;
      const errMsg = [];
      for (const key in errors) {
        const errArr = errors[key];
        errMsg.push(`${hS(key)} ${errArr.join('. ')}`);
      }
      dispatch(setErrorMessage(`${errMsg.join('. ')}.`));
    } finally {
      dispatch(setIsLoading(false));
    }
  };
export const userGoogleLogin =
  (payload: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const {
        data: { data: user, token },
      } = await loginWithGoogle(payload);
      dispatch(setUser({ user }));
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      setLS('is_completed_primary_details', user.attributes.completed_primary_details);
      dispatch(setIsLoggedIn(true));
      dispatch(setErrorMessage(null));
    } catch (err: any) {
      dispatch(setErrorMessage(err.response.data.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const userFacebookLogin =
  (payload: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const {
        data: { data: user, token },
      } = await loginWithFacebook(payload);
      dispatch(setUser({ user }));

      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      setLS('is_completed_primary_details', user.attributes.completed_primary_details);
      dispatch(setIsLoggedIn(true));

      dispatch(setErrorMessage(null));
    } catch (err: any) {
      dispatch(setErrorMessage(err.response.data.message));
    } finally {
      dispatch(setIsLoading(false));
    }
  };

export const getUserProfile = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));
    const {
      data: { data },
    } = await getUserProfileService();
    setLS('is_completed_primary_details', data.attributes.completed_primary_details);
    dispatch(setUser({ user: data }));
    dispatch(setIsLoggedIn(true));
  } catch (err: any) {
    // dispatch(setErrorMessage(err.response.data.error));

    dispatch(setIsLoggedIn(false));
  } finally {
    dispatch(setIsLoading(false));
  }
};

export const userLogout = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setIsLoading(true));

    await logout();
    removeLS('auth_token');
    removeLS('user');
    removeLS('is_completed_primary_details');
    dispatch(setIsLoggedIn(false));
  } catch (err: any) {
    dispatch(setErrorMessage(err.response.data.message));
  } finally {
    dispatch(setIsLoading(false));
  }
};

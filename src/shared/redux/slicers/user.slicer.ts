import build from '@date-io/date-fns';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { authDao } from 'shared/dao/authDao';
import { ISignInRequestPayload, IUser } from 'shared/interfaces/IUser';
import { authService } from 'shared/services/authService';

import { ls } from 'shared/utils/ls';
import { AppThunk, RootState } from '../store';

const { loginWithGoogle, loginWithFacebook, logout, getUserProfile: getUserProfileService } = authDao();
const { login } = authService();
const { setLS, removeLS } = ls();

export interface UserState {
  isLoading: boolean;
  user: IUser | null;
  errorMessage: string | null;
  isLoggedIn: boolean;
}
const initialState: UserState = {
  isLoading: false,
  user: null,
  errorMessage: null,
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
    setIsLoggedIn(state: UserState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state, { payload }) => {
      const { data: user, token } = payload;
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      state.user = user;
      state.isLoggedIn = true;
      state.isLoading = false;
    });
    builder.addCase(login.rejected, (state, { payload }) => {
      state.errorMessage = payload.response.data.message;
      state.isLoading = false;
    });
  },
});

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;

export const { setUser, setIsLoading, setErrorMessage, setIsLoggedIn } = userSlicer.actions;
export default userSlicer.reducer;

export const userGoogleLogin =
  (payload: string): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));
      const {
        data: { data: user, token },
      } = await loginWithGoogle(payload);
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      dispatch(setUser({ user }));
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
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      dispatch(setUser({ user }));
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
    dispatch(setUser({ user: data }));
    dispatch(setIsLoggedIn(true));
  } catch (err: any) {
    dispatch(setErrorMessage(err.response.data.message));
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

    dispatch(setIsLoggedIn(false));
  } catch (err: any) {
    dispatch(setErrorMessage(err.response.data.message));
  } finally {
    dispatch(setIsLoading(false));
  }
};

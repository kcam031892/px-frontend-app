import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authDao } from 'shared/dao/authDao';
import { ISignInRequestPayload, IUser } from 'shared/interfaces/IUser';
import { ls } from 'shared/utils/ls';
import { AppThunk, RootState } from '../store';

const { loginWithGoogle, loginWithFacebook, logout, getUserProfile: getUserProfileService, login } = authDao();

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
    handleAuthExpired(state: UserState) {
      removeLS('auth_token');
      state.errorMessage = null;
      state.isLoggedIn = false;
    },
  },
});

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;

export const { setUser, setIsLoading, setErrorMessage, setIsLoggedIn, handleAuthExpired } = userSlicer.actions;
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

    dispatch(setIsLoggedIn(false));
  } catch (err: any) {
    dispatch(setErrorMessage(err.response.data.message));
  } finally {
    dispatch(setIsLoading(false));
  }
};

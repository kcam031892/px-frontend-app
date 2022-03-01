import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISignInRequestPayload, IUser } from 'shared/interfaces/IUser';
import { authService } from 'shared/services/authService';
import { ls } from 'shared/utils/ls';
import { AppThunk, RootState } from '../store';

const { login, loginWithGoogle, logout } = authService();
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
    setErrorMessage(state: UserState, action: PayloadAction<string>) {
      state.errorMessage = action.payload;
    },
    setIsLoggedIn(state: UserState, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
  },
  extraReducers: {},
});

export const selectUserState = (state: RootState) => state.user;
export const selectUser = (state: RootState) => state.user.user;

export const { setUser, setIsLoading, setErrorMessage, setIsLoggedIn } = userSlicer.actions;
export default userSlicer.reducer;

export const userLogin =
  (payload: ISignInRequestPayload): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setIsLoading(true));

      const {
        data: { user, token },
      } = await login(payload);

      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      dispatch(setUser({ user }));
      dispatch(setIsLoggedIn(true));
      return user;
    } catch (err: any) {
      dispatch(setErrorMessage(err.response.data.message));

      // console.log(JSON.stringify(err.response.data.message));
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
        data: { user, token },
      } = await loginWithGoogle(payload);
      setLS('auth_token', token);
      setLS('user', JSON.stringify(user));
      dispatch(setUser({ user }));
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

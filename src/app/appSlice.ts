import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { checkCode, forgot, login, reset } from '../api/myAccount';
import { DataResult, Result, ResultType } from '../types';
import { AppThunk } from './store';
import Cookies from 'universal-cookie';

export interface AppState {
  isLoading: boolean;
  showResult: boolean;
  currentResult?: Result;
  memberId: string;
  loggedIn: boolean;
  requestForgotOk: boolean;
  rememberMe: boolean;
}

export interface UserLoginState {
  memberId: string;
}

export interface LoginParam {
  rememberMe: boolean;
  result: Result;
}

const getMemeberId = () => {
  const cookies = new Cookies();
  if ((cookies.get('memberId') || '').length > 0) {
    sessionStorage.setItem('memberId', cookies.get('memberId'));
  }
  return sessionStorage.getItem('memberId') || '';
};

const initialState: AppState = {
  isLoading: false,
  showResult: false,
  memberId: getMemeberId(),
  loggedIn: getMemeberId().length > 0,
  requestForgotOk: false,
  rememberMe: false,
};

function hideResultMessage(state: AppState) {
  state.showResult = false;
}

const appSlice = createSlice({
  name: 'axios',
  initialState,
  reducers: {
    startLoading(state: AppState) {
      state.isLoading = true;
    },

    finishLoading(state: AppState) {
      state.isLoading = false;
    },

    hideNotification: hideResultMessage,

    setCurrentResult(state: AppState, action: PayloadAction<Result>) {
      state.showResult = action.payload.showMessage;
      state.currentResult = action.payload;
    },

    showError(state: AppState, action: PayloadAction<string>) {
      state.showResult = true;
      state.currentResult = {
        type: ResultType.error,
        message: action.payload,
        showMessage: true,
      };
    },
    completeLogin(state: AppState, action: PayloadAction<LoginParam>) {
      const result = action.payload.result;
      if (result.type === ResultType.success) {
        state.loggedIn = true;
        state.memberId = (result as DataResult<string>).data;
        state.rememberMe = action.payload.rememberMe;
        sessionStorage.setItem('memberId', state.memberId);
        if (state.rememberMe) {
          const cookies = new Cookies();
          const d = new Date();
          d.setTime(d.getTime() + 60 * 24 * 60 * 1000);
          cookies.set('memberId', state.memberId, { path: '/', expires: d });
        }
      } else {
        state.showResult = true;
        state.currentResult = {
          type: ResultType.error,
          message: result.message,
          showMessage: true,
        };
      }
    },

    completeForgot(state: AppState, action: PayloadAction<Result>) {
      const result = action.payload;
      state.currentResult = result;
      state.requestForgotOk = result.type === ResultType.success;
    },

    initialForgot(state: AppState, action: PayloadAction) {
      state.currentResult = undefined;
      state.requestForgotOk = false;
    },

    logOut(state: AppState, action: PayloadAction) {
      sessionStorage.removeItem('memberId');
      const cookies = new Cookies();
      cookies.remove('memberId', { path: '/' });
      state.loggedIn = false;
      state.memberId = '';
    },
  },
});

export const {
  startLoading,
  finishLoading,
  hideNotification,
  setCurrentResult,
  completeLogin,
  showError,
  completeForgot,
  initialForgot,
  logOut,
} = appSlice.actions;

export default appSlice.reducer;

export const userLogin =
  (email: string, password: string, rememberMe: boolean): AppThunk =>
  async (dispatch) => {
    try {
      const result = await login(email, password);
      dispatch(completeLogin({ rememberMe, result }));
    } catch (err) {}
  };

export const requestForgot =
  (email: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await forgot(email);
      dispatch(completeForgot(result));
    } catch (err) {}
  };

export const postReset =
  (code: string, password: string): AppThunk =>
  async (dispatch) => {
    try {
      const result = await reset(code, password);
      const rememberMe = false;
      dispatch(completeLogin({ rememberMe, result }));
    } catch (err) {}
  };

export const postCheckCode =
  (code: string): AppThunk =>
  async (dispatch) => {
    try {
      await checkCode(code);
    } catch (err) {}
  };

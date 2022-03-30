import { createAsyncThunk } from '@reduxjs/toolkit';

import { authDao } from 'shared/dao/authDao';

import { ISignInRequestPayload, ISignInResponsePayload } from 'shared/interfaces/IUser';

const { login: loginDao } = authDao();

export const authService = () => {
  const login = createAsyncThunk<ISignInResponsePayload, ISignInRequestPayload, { rejectValue: any }>(
    'users/login',
    async (payload: ISignInRequestPayload, thunkApi) => {
      try {
        const response = await loginDao(payload);
        return response.data;
      } catch (err) {
        return thunkApi.rejectWithValue(err);
      }
    },
  );

  return {
    login,
  };
};

import { createAsyncThunk } from '@reduxjs/toolkit';
import { useMutation } from 'react-query';

import { authDao } from 'shared/dao/authDao';

import {
  ISignInRequestPayload,
  ISignInResponsePayload,
  IUserCompleteProfilePayload,
  IUserCompleteProfileResponsePayload,
} from 'shared/interfaces/IUser';

const { login: loginDao, setCompleteProfile: setCompleteProfileDao } = authDao();

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

  const setCompleteProfile = () => {
    return useMutation<IUserCompleteProfileResponsePayload, Error, IUserCompleteProfilePayload>(
      (payload: IUserCompleteProfilePayload) => setCompleteProfileDao(payload),
    );
  };

  return {
    login,
    setCompleteProfile,
  };
};

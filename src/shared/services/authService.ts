import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authDao } from 'shared/dao/authDao';
import { useAxios } from 'shared/hooks/useAxios';
import { ISignInRequestPayload, ISignInResponsePayload } from 'shared/interfaces/IUser';

import { tokenService } from './tokenService';
const { GET, POST, DELETE } = useAxios();
const { getAuthToken } = tokenService();

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

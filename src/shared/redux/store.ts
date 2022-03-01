import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slicers/user.slicer';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

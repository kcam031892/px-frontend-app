import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
// export const useAppDispatch = () => useDispatch<AppDispatch>();

import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import foobarReducer from '../slices/foobarSlice';
import timeFactorReducer from '../slices/timeFactorSlice';

export const store = configureStore({
  reducer: {
    foobar: foobarReducer,
    timeFactor: timeFactorReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

export interface TimeFactorState {
  timeFactor: number;
}

const initialState: TimeFactorState = {
  timeFactor: 5,
};

export const timeFactorSlice = createSlice({
  name: 'timeFactor',
  initialState,
  reducers: {
    updateTimeFactor: (
      state,
      { payload: timeFactor }: PayloadAction<number>
    ) => {
      state.timeFactor = timeFactor;
    },
  },
});

export const { updateTimeFactor } = timeFactorSlice.actions;

export const selectTimeFactor = (state: RootState) =>
  state.timeFactor.timeFactor;

export default timeFactorSlice.reducer;

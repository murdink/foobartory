import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';

const MAX_FOO_COUNT = 1000;
const MAX_BAR_COUNT = 1000;
const MAX_FOOBAR_COUNT = 1000;
const MAX_ROBOTS_COUNT = 20;

export interface FoobarState {
  fooCount: number;
  barCount: number;
  foobarCount: number;
  robotCount: number;
}

const initialState: FoobarState = {
  fooCount: 0,
  barCount: 0,
  foobarCount: 0,
  robotCount: 2,
};

export const foobarSlice = createSlice({
  name: 'foobar',
  initialState,
  reducers: {
    updateCounters: (
      state,
      {
        payload: { foos, bars, foobars, robots },
      }: PayloadAction<{
        foos?: number;
        bars?: number;
        foobars?: number;
        robots?: number;
      }>
    ) => {
      if (foos) state.fooCount += foos;
      if (bars) state.barCount += bars;
      if (foobars) state.foobarCount += foobars;
      if (robots) state.robotCount += robots;
    },
  },
});

export const { updateCounters } = foobarSlice.actions;

export const selectFooCount = (state: RootState) => state.foobar.fooCount;
export const selectBarCount = (state: RootState) => state.foobar.barCount;
export const selectFoobarCount = (state: RootState) => state.foobar.foobarCount;
export const selectRobotCount = (state: RootState) => state.foobar.robotCount;
export const selectCanMineFoo = (state: RootState) =>
  state.foobar.fooCount < MAX_FOO_COUNT;
export const selectCanMineBar = (state: RootState) =>
  state.foobar.barCount < MAX_BAR_COUNT;
export const selectCanAssembleFoobar = (state: RootState) =>
  state.foobar.fooCount >= 1 &&
  state.foobar.barCount >= 1 &&
  state.foobar.foobarCount < MAX_FOOBAR_COUNT;
export const selectCanBuyRobot = (state: RootState) =>
  state.foobar.fooCount >= 6 &&
  state.foobar.foobarCount >= 3 &&
  state.foobar.robotCount < MAX_ROBOTS_COUNT;

export default foobarSlice.reducer;

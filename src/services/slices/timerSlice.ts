import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TimerState } from '../../types/types';

const initialState: TimerState = {
  remainingTime: 0,
  canCancel: false,
};

export const timerSlice = createSlice({
  name: 'timer',
  initialState,
  reducers: {
    setRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
    setCanCancel: (state, action: PayloadAction<boolean>) => {
      state.canCancel = action.payload;
    },
  },
});

export const { setRemainingTime, setCanCancel } = timerSlice.actions;

export default timerSlice.reducer;

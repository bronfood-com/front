import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressBarState {
  estimatedTime: number;
  startTime: number;
}

const initialState: ProgressBarState = {
  estimatedTime: 0,
  startTime: 0,
};

export const progressBarSlice = createSlice({
  name: 'progressBar',
  initialState,
  reducers: {
    setStartTime: (state, action: PayloadAction<number>) => {
        state.startTime = action.payload;
    },
    setEstimatedTime: (state, action: PayloadAction<number>) => {
        state.estimatedTime = action.payload;
    },
  },
});

export const { setStartTime, setEstimatedTime } = progressBarSlice.actions;

export default progressBarSlice.reducer;

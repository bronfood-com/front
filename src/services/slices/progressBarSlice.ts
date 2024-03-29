import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProgressBarState {
  estimatedTime: number;
}

const initialState: ProgressBarState = {
  estimatedTime: 0, // Начальное значение адаптровать
};

export const progressBarSlice = createSlice({
  name: 'progressBar',
  initialState,
  reducers: {
    setEstimatedTime: (state, action: PayloadAction<number>) => {
      state.estimatedTime = action.payload;
    },
  },
});

export const { setEstimatedTime } = progressBarSlice.actions;

export default progressBarSlice.reducer;

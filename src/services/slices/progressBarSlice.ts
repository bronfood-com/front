import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { confirmOrderThunk } from '../thunks/confirmOrderThunk';

interface ProgressBarState {
  startTime: number;
  estimatedTime: number;
  orderConfirmed: boolean;
  orderDetails: any;
}

const initialState: ProgressBarState = {
  startTime: 0,
  estimatedTime: 0,
  orderConfirmed: false,
  orderDetails: null,
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
    resetStartTime: (state) => {
        state.startTime = 0;
    },
    resetEstimatedTime: (state) => {
        state.estimatedTime = 0;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(confirmOrderThunk.fulfilled, (state, action) => {
        state.orderConfirmed = true;
        state.orderDetails = action.payload;
    })
    .addCase(confirmOrderThunk.rejected, (state) => {
        state.orderDetails = 'Ошибка при подтверждении заказа';
    });
  },
});

export const {
    setStartTime,
    setEstimatedTime,
    resetStartTime,
    resetEstimatedTime
} = progressBarSlice.actions;

export default progressBarSlice.reducer;

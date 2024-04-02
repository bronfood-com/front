import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { confirmOrderThunk } from '../thunks/сonfirmOrderThunk';
import { IOrder } from '../../interfaces/order';

interface ProgressBarState {
  startTime: number;
  estimatedTime: number;
  orderConfirmed: boolean;
  orderDetails: IOrder | null;
  orderError: string | null;
}

const initialState: ProgressBarState = {
  startTime: 0,
  estimatedTime: 0,
  orderConfirmed: false,
  orderDetails: null,
  orderError: null,
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
    resetProgressBarState: (state) => {
        state.startTime = 0;
        state.estimatedTime = 0;
        state.orderConfirmed = false;
        state.orderDetails = null;
        state.orderError = null;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(confirmOrderThunk.fulfilled, (state, action) => {
        state.orderConfirmed = true;
        state.orderDetails = action.payload;
    })
    .addCase(confirmOrderThunk.rejected, (state, action) => {
        state.orderError = action.error?.message || 'An error occurred during order confirmation';
    });
  },
});

export const {
    setStartTime,
    setEstimatedTime,
    resetStartTime,
    resetEstimatedTime,
    resetProgressBarState,
} = progressBarSlice.actions;

export default progressBarSlice.reducer;

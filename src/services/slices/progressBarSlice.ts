import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { confirmOrder } from '../thunks/ConfirmOrderThunk';

interface ProgressBarState {
  startTime: number;
  estimatedTime: number;
  orderConfirmed: boolean;
  orderDetails: any; // на всякий случай для хранения деталей заказа
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
  },
  extraReducers: (builder) => {
    builder
    .addCase(confirmOrder.fulfilled, (state, action) => {
        state.orderConfirmed = true;
        state.orderDetails = action.payload;
    })
    .addCase(confirmOrder.rejected, (state) => {
        state.orderDetails = 'Ошибка при подтверждении заказа';
    });
  },
});

export const { setStartTime, setEstimatedTime } = progressBarSlice.actions;

export default progressBarSlice.reducer;

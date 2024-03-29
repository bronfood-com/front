import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CancellationTimeState {
  remainingTime: number;
  canCancel: boolean;
  orderTime: number;
  startCancellationTime: number | null;
}

const initialState: CancellationTimeState = {
  remainingTime: 0,
  canCancel: false,
  orderTime: 0,
  startCancellationTime: null,
};

export const cancellationTimeSlice = createSlice({
  name: 'cancellationTime',
  initialState,
  reducers: {
    setRemainingTime: (state, action: PayloadAction<number>) => {
      state.remainingTime = action.payload;
    },
    setCanCancel: (state, action: PayloadAction<boolean>) => {
      state.canCancel = action.payload;
    },
    resetCancellationTime: () => initialState,
    decrementRemainingTime(state) {
        if (state.remainingTime > 0) {
            state.remainingTime -= 1;
        } else {
            state.canCancel = false;
        }
    },
    setOrderTime: (state, action: PayloadAction<number>) => {
        state.orderTime = action.payload;
    },
    setStartCancellationTime: (state, action: PayloadAction<number | null>) => {
        state.startCancellationTime = action.payload;
      },
      resetStartCancellationTime: (state) => {
        state.startCancellationTime = null;
      },
  },
});

export const {
    setRemainingTime,
    setCanCancel,
    resetCancellationTime,
    decrementRemainingTime,
    setOrderTime,
    setStartCancellationTime,
    resetStartCancellationTime,
} = cancellationTimeSlice.actions;

export default cancellationTimeSlice.reducer;

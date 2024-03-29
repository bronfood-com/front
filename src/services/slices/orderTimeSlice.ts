import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OrderTimeState {
  estimatedTime: number;
}

const initialState: OrderTimeState = {
  estimatedTime: 0,
};

export const orderTimeSlice = createSlice({
  name: 'orderTime',
  initialState,
  reducers: {
    setEstimatedTime: (state, action: PayloadAction<number>) => {
      state.estimatedTime = action.payload;
    },
  },
});

export const { setEstimatedTime } = orderTimeSlice.actions;

export default orderTimeSlice.reducer;

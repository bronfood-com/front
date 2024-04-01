import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';
import { confirmOrder } from '../thunks/confirmOrderThunk';

export interface OrderState {
  orderData: IOrder | null;
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orderData: null,
  loading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(confirmOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.orderData = action.payload;
        state.loading = false;
      })
      .addCase(confirmOrder.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload ?? 'Unknown error in orderSlice';
        state.loading = false;
      });
  },
});

export default orderSlice.reducer;

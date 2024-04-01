import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';
import { confirmOrderThunk } from '../thunks/confirmOrderThunk';

interface OrderState {
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
      .addCase(confirmOrderThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(confirmOrderThunk.fulfilled, (state, action: PayloadAction<IOrder>) => {
        state.loading = false;
        state.orderData = action.payload;
        state.error = null;
      })
      .addCase(confirmOrderThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Произошла ошибка';
      });
  },
});

export default orderSlice.reducer;

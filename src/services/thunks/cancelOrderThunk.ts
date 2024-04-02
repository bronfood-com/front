import { createAsyncThunk } from '@reduxjs/toolkit';
import { IOrder } from '../../interfaces/order';

export const cancelOrderThunk = createAsyncThunk<IOrder | null, void, { rejectValue: string }>(
  'order/cancel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await new Promise<IOrder | null>((resolve) =>
        setTimeout(() => resolve(null), 2000)
      );
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при отмене заказа');
    }
  }
);

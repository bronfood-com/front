import { createAsyncThunk } from '@reduxjs/toolkit';
import orderMock from '../../utils/serverMocks/orderMock.json';
import { IOrder } from '../../interfaces/order';

export const confirmOrder = createAsyncThunk<IOrder, void, { rejectValue: string }>(
  'order/confirm',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация задержки ответа сервера
      const response = await new Promise<IOrder>((resolve) => setTimeout(() => resolve(orderMock), 2000));
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при подтверждении заказа');
    }
  }
);


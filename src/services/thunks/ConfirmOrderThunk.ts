import { createAsyncThunk } from '@reduxjs/toolkit';
import orderMock from '../../utils/serverMocks/orderMock.json';

export const confirmOrder = createAsyncThunk(
  'order/confirm',
  async (_, { rejectWithValue }) => {
    try {
      // Имитация задержки ответа сервера
      const response = await new Promise((resolve) => setTimeout(() => {
        resolve(orderMock);
      }, 2000)); // Задержка в 2 секунды
      return response;
    } catch (error) {
      return rejectWithValue('Ошибка при подтверждении заказа');
    }
  }
);

import { configureStore } from '@reduxjs/toolkit';
import progressBarReducer from './slices/progressBarSlice';
import cancellationTimeReducer from './slices/cancellationTimeSlice';
import orderReducer from './slices/orderSlice';

export const store = configureStore({
  reducer: {
    progressBar: progressBarReducer,
    cancellationTime: cancellationTimeReducer,
    order: orderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import timerReducer from './slices/timerSlice';
import progressBarReducer from './slices/progressBarSlice';
import orderTimeReducer from './slices/orderTimeSlice';
import cancellationTimeReducer from './slices/cancellationTimeSlice';

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    progressBar: progressBarReducer,
    orderTime: orderTimeReducer,
    cancellationTime: cancellationTimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { configureStore } from '@reduxjs/toolkit';
import progressBarReducer from './slices/progressBarSlice';
import cancellationTimeReducer from './slices/cancellationTimeSlice';

export const store = configureStore({
  reducer: {
    progressBar: progressBarReducer,
    cancellationTime: cancellationTimeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

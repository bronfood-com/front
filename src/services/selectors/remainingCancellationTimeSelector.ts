import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const selectCancellationTimeState = (state: RootState) => state.cancellationTime;

export const selectRemainingCancellationTime = createSelector(
  [selectCancellationTimeState],
  (cancellationTimeState) => cancellationTimeState.remainingCancellationTime
);

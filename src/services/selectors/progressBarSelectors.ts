import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectProgressBarState = (state: RootState) => state.progressBar;

export const selectStartTime = createSelector(
    [selectProgressBarState],
    (progressBarState) => progressBarState.startTime
);

export const selectEstimatedTime = createSelector(
    [selectProgressBarState],
    (progressBarState) => progressBarState.estimatedTime
);

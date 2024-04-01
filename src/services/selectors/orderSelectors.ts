import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectOrderState = (state: RootState) => state.order;

export const selectOrderLoading = createSelector(
    [selectOrderState],
    (orderState) => orderState.loading
);

export const selectOrderData = createSelector(
    [selectOrderState],
    (orderState) => orderState.orderData
);

export const selectOrderError = createSelector(
    [selectOrderState],
    (orderState) => orderState.error
);

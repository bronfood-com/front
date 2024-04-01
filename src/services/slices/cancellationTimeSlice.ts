import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CancellationTimeState {
  cancellationTime: number;
  remainingCancellationTime: number;
}

const initialState: CancellationTimeState = {
  cancellationTime: 0,
  remainingCancellationTime: 0,
};

export const cancellationSlice = createSlice({
    name: 'cancellationTime',
    initialState,
    reducers: {
        setCancellationTime: (state, action: PayloadAction<number>) => {
        state.cancellationTime = action.payload;
        },
        setRemainingCancellationTime: (state, action: PayloadAction<number>) => {
        state.remainingCancellationTime = action.payload;
        },
    },
});

export const { setCancellationTime, setRemainingCancellationTime } = cancellationSlice.actions;

export default cancellationSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const daysSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.push(payload);
        },
    },
});

export const { setData } = daysSlice.actions;

export default daysSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const monthsSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.push(payload);
        },
    },
});

export const { setData } = monthsSlice.actions;

export default monthsSlice.reducer;
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const weeksSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.push(payload);
        },
    },
});

export const { setData } = weeksSlice.actions;

export default weeksSlice.reducer;
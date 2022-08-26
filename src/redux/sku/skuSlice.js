import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const skuSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        setData: (state, { payload }) => {
            state.push(payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { setData } = skuSlice.actions;

export default skuSlice.reducer;
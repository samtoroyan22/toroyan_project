import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  preorders: [],
};

export const preordersSlice = createSlice({
  name: 'preorders',
  initialState,
  reducers: {
    setPreorders: (state, action) => {
      state.preorders = action.payload;
    },
  },
});

export const { setPreorders } = preordersSlice.actions;

export default preordersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  datacenters: [],
};

export const datacentersSlice = createSlice({
  name: 'datacenters',
  initialState,
  reducers: {
    setDatacenters: (state, action) => {
      state.datacenters = action.payload;
    },
  },
});

export const { setDatacenters } = datacentersSlice.actions;

export default datacentersSlice.reducer;


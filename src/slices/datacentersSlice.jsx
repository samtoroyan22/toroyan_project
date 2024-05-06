import { createSlice } from '@reduxjs/toolkit';

export const datacentersSlice = createSlice({
  name: 'datacenters',
  initialState: {
    datacenters: [],
  },
  reducers: {
    setDatacenters: (state, action) => {
      state.datacenters = action.payload;
    },
  },
});

export const { setDatacenters } = datacentersSlice.actions;

export default datacentersSlice.reducer;

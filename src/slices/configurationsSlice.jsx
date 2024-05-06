
import { createSlice } from '@reduxjs/toolkit';

export const configurationsSlice = createSlice({
  name: 'configurations',
  initialState: {
    configurations: [],
  },
  reducers: {
    setConfigurations: (state, action) => {
      state.configurations = action.payload;
    },
  },
});

export const { setConfigurations } = configurationsSlice.actions;

export default configurationsSlice.reducer;

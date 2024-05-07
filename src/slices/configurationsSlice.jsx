import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  configurations: [],
};

export const configurationsSlice = createSlice({
  name: 'configurations',
  initialState,
  reducers: {
    setConfigurations: (state, action) => {
      state.configurations = action.payload;
    },
  },
});

export const { setConfigurations } = configurationsSlice.actions;

export default configurationsSlice.reducer;


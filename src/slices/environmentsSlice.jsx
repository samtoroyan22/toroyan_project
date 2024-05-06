import { createSlice } from '@reduxjs/toolkit';

export const environmentsSlice = createSlice({
  name: 'environments',
  initialState: {
    environments: [],
  },
  reducers: {
    setEnvironments: (state, action) => {
      state.environments = action.payload;
    },
  },
});

export const { setEnvironments } = environmentsSlice.actions;

export default environmentsSlice.reducer;

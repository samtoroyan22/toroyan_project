import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  environments: [],
};

export const environmentsSlice = createSlice({
  name: 'environments',
  initialState,
  reducers: {
    setEnvironments: (state, action) => {
      state.environments = action.payload;
    },
  },
});

export const { setEnvironments } = environmentsSlice.actions;

export default environmentsSlice.reducer;

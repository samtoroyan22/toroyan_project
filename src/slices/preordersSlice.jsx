import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  environments: [],
  configurations: [],
  datacenters: [],
  preorders: [],
};

export const preordersSlice = createSlice({
  name: 'preorders',
  initialState,
  reducers: {
    setEnvironments: (state, action) => {
      state.environments = action.payload;
    },
    setConfigurations: (state, action) => {
      state.configurations = action.payload;
    },
    setDatacenters: (state, action) => {
      state.datacenters = action.payload;
    },
    setPreorders: (state, action) => {
      state.preorders = action.payload;
    },
  },
});

export const { setEnvironments, setConfigurations, setDatacenters, setPreorders } = preordersSlice.actions;

export const fetchPreorders = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/preorders');
    const data = await response.json();
    dispatch(setPreorders(data));
  } catch (error) {
    console.error('Error fetching preorders:', error);
  }
};

export const fetchFilteredPreorders = (params) => async (dispatch) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3001/preorders?${queryParams}`);
    const data = await response.json();
    dispatch(setPreorders(data));
  } catch (error) {
    console.error('Error fetching filtered preorders:', error);
  }
};

export const fetchEnvironments = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/environments');
    const data = await response.json();
    dispatch(setEnvironments(data));
  } catch (error) {
    console.error('Error fetching environments:', error);
  }
};

export const fetchConfigurations = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/configurations');
    const data = await response.json();
    dispatch(setConfigurations(data));
  } catch (error) {
    console.error('Error fetching configurations:', error);
  }
};

export const fetchDatacenters = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/datacenters');
    const data = await response.json();
    dispatch(setDatacenters(data));
  } catch (error) {
    console.error('Error fetching datacenters:', error);
  }
};

export const createPreorder = createAsyncThunk(
  'preorders/createPreorder',
  async (preorderData, { dispatch }) => {
    try {
      const response = await fetch('http://localhost:3001/preorders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(preorderData)
      });

      if (!response.ok) {
        throw new Error('Failed to create preorder');
      }

      dispatch(fetchPreorders());

      return await response.json();
    } catch (error) {
      console.error('Error creating preorder:', error);
      throw error;
    }
  }
);

export default preordersSlice.reducer;

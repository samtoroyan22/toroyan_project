import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchConfigurationsChart = createAsyncThunk(
  'configurationsChart/fetchConfigurationsChart',
  async () => {
    const response = await fetch('http://localhost:3001/configurations_chart');
    if (!response.ok) {
      throw new Error('Failed to fetch configurations chart data');
    }
    const data = await response.json();
    return data;
  }
);

const configurationsChartSlice = createSlice({
  name: 'configurationsChart',
  initialState: {
    loading: false,
    error: null,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfigurationsChart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfigurationsChart.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConfigurationsChart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default configurationsChartSlice.reducer;

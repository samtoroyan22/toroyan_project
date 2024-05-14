import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchConfigurationsChart } from '../api/fetchConfigurationsChart';

export const fetchConfigurationsChartData = createAsyncThunk(
  'configurationsChart/fetchConfigurationsChartData',
  async () => {
    const data = await fetchConfigurationsChart();
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
      .addCase(fetchConfigurationsChartData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConfigurationsChartData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchConfigurationsChartData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default configurationsChartSlice.reducer;

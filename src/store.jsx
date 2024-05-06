import { configureStore } from '@reduxjs/toolkit';
import preordersReducer from './slices/preordersSlice';
import environmentsReducer from './slices/environmentsSlice';
import configurationsReducer from './slices/configurationsSlice';
import datacentersReducer from './slices/datacentersSlice';
import configurationsChartReducer from './slices/configurationsChartSlice';

export default configureStore({
  reducer: {
    preorders: preordersReducer,
    environments: environmentsReducer,
    configurations: configurationsReducer,
    datacenters: datacentersReducer,
    configurationsChart: configurationsChartReducer,
  },
});

import { configureStore } from '@reduxjs/toolkit';
import preordersReducer from './preordersSlice';
import environmentsReducer from './environmentsSlice';
import configurationsReducer from './configurationsSlice';
import datacentersReducer from './datacentersSlice';
import configurationsChartReducer from './configurationsChartSlice';

export default configureStore({
  reducer: {
    preorders: preordersReducer,
    environments: environmentsReducer,
    configurations: configurationsReducer,
    datacenters: datacentersReducer,
    configurationsChart: configurationsChartReducer,
  },
});

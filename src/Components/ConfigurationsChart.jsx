import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { fetchConfigurationsChart } from '../slices/configurationsChartSlice';
import { Spin } from 'antd';
import Chart from 'chart.js/auto';

const ConfigurationsChart = () => {
  const dispatch = useDispatch();
  const configurationsChartData = useSelector((state) => state.configurationsChart.data);
  const configurationsChartLoading = useSelector((state) => state.configurationsChart.loading);
  const configurationsChartError = useSelector((state) => state.configurationsChart.error);

  useEffect(() => {
    dispatch(fetchConfigurationsChart());
  }, [dispatch]);

  if (configurationsChartError) {
    return <div>Error: {configurationsChartError}</div>;
  }

  const dates = configurationsChartData.map((item) => new Date(item.date));
  const counts = configurationsChartData.map((item) => item.count);

  const data = {
    labels: dates,
    datasets: [
      {
        label: 'Configurations',
        data: counts,
        fill: false,
      },
    ],
  };

  return (
    <div id='content'>
      <h2 style={{marginLeft:50}}>Configurations Chart</h2>
      {configurationsChartLoading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Line data={data} />
      )}
    </div>
  );
};

export default ConfigurationsChart;

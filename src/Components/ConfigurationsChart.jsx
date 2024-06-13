import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Bar } from 'react-chartjs-2';
import { fetchConfigurations } from '../api/fetchConfigurations';
import { fetchConfigurationsChart } from '../api/fetchConfigurationsChart';
import { Spin, Select } from 'antd';
import Chart from 'chart.js/auto';

const { Option } = Select;

const ConfigurationsChart = () => {
  const dispatch = useDispatch();
  const configurations = useSelector(state => state.configurations.configurations);
  const [selectedConfiguration, setSelectedConfiguration] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchConfigurations());
  }, [dispatch]);

  const handleConfigurationChange = async (value) => {
    setSelectedConfiguration(value);
    setLoading(true);
    try {
      const data = await fetchConfigurationsChart(value);
      setChartData(data.filter(item => item.configurationId == value));
    } catch (error) {
      console.error('Error fetching configurations chart data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id='content'>
      <h2 style={{ marginLeft: 50 }}>Configurations Chart</h2>
      <Select
        placeholder="Select a configuration"
        style={{ width: 200, marginLeft: 50, marginBottom: 20 }}
        onChange={handleConfigurationChange}
      >
        {configurations && configurations.map(config => (
          <Option key={config.id} value={config.id}>{config.code}</Option>
        ))}
      </Select>
      {loading ? (
        <div style={{ textAlign: 'center', marginTop: 50 }}>
          <Spin size="large" />
        </div>
      ) : chartData ? (
        <Bar
          data={{
            labels: chartData.map(item => item.date),
            datasets: [{
              label: 'Count',
              data: chartData.map(item => item.count),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          }}
          options={{
            indexAxis: 'x',
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      ) : null}
    </div>
  );
};

export default ConfigurationsChart;
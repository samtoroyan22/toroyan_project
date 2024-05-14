export const fetchConfigurationsChart = async () => {
  const response = await fetch('http://localhost:3001/configurations_chart');
  if (!response.ok) {
    throw new Error('Failed to fetch configurations chart data');
  }
  const data = await response.json();
  return data;
};

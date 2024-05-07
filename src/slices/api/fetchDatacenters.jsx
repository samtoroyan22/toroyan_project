import { setDatacenters } from '../datacentersSlice';

export const fetchDatacenters = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/datacenters');
    const data = await response.json();
    dispatch(setDatacenters(data));
  } catch (error) {
    console.error('Error fetching datacenters:', error);
  }
};
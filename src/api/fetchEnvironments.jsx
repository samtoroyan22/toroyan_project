import { setEnvironments } from '../slices/environmentsSlice';

export const fetchEnvironments = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/environments');
    const data = await response.json();
    dispatch(setEnvironments(data));
  } catch (error) {
    console.error('Error fetching environments:', error);
  }
};
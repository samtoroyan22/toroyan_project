import {setConfigurations} from '../slices/configurationsSlice';

export const fetchConfigurations = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/configurations');
    const data = await response.json();
    dispatch(setConfigurations(data));
  } catch (error) {
    console.error('Error fetching configurations:', error);
  }
};
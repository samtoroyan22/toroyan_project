import { setPreorders } from '../slices/preordersSlice';

export const fetchPreorders = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:3001/preorders');
    const data = await response.json();
    dispatch(setPreorders(data));
  } catch (error) {
    console.error('Error fetching preorders:', error);
  }
};

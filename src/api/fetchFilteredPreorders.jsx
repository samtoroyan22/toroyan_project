import { setPreorders } from '../slices/preordersSlice';

export const fetchFilteredPreorders = (params) => async (dispatch) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3001/preorders?${queryParams}`);
    const data = await response.json();
    dispatch(setPreorders(data));
  } catch (error) {
    console.error('Error fetching filtered preorders:', error);
  }
};
export const fetchFiltered = (params, entity, setAction) => async (dispatch) => {
  try {
    const queryParams = new URLSearchParams(params).toString();
    const response = await fetch(`http://localhost:3001/${entity}?${queryParams}`);
    const data = await response.json();
    dispatch(setAction(data));
  } catch (error) {
    console.error(`Error fetching filtered ${entity}:`, error);
  }
};

export const FETCH_FULFILLED = 'FETCH_FULFILLED';
export const SET_STATUS = 'SET_STATUS';
export const FETCH_DATA = 'FETCH_DATA';
export const SEARCH = 'SEARCH';

export const fetchFulfilled = (beers) => {
  return {
    type: FETCH_FULFILLED,
    payload: beers,
  };
};

export const setStatus = (status) => {
  return {
    type: SET_STATUS,
    payload: status,
  };
};

export const fetchData = () => {
  return {
    type: FETCH_DATA,
  };
};

export const search = (input) => {
  return {
    type: SEARCH,
    payload: input,
  };
};

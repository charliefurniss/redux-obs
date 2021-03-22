export const FETCH_FULFILLED = 'FETCH_FULFILLED';
export const FETCH_FAILED = 'FETCH_FAILED';
export const SET_STATUS = 'SET_STATUS';
export const FETCH_DATA = 'FETCH_DATA';
export const SEARCH = 'SEARCH';
export const CANCEL = 'CANCEL';
export const RESET = 'RESET';

export const fetchFulfilled = (beers) => {
  return {
    type: FETCH_FULFILLED,
    payload: beers,
  };
};

export const fetchFailed = (message) => {
  return {
    type: FETCH_FAILED,
    payload: message,
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

export const cancel = () => {
  return {
    type: CANCEL,
  };
};

export const reset = () => {
  return {
    type: RESET,
  };
};

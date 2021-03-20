export const appReducer = (state = { name: 'Charlie' }, action) => {
  switch (action.type) {
    case 'SET_NAME': {
      return {
        ...state,
        name: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

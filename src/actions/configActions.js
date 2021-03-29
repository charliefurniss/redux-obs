export const SET_CONFIG = 'SET_CONFIG';

// partialObject is any object literal contains the keys that match the config
export function setConfig(partialObject) {
  return {
    type: SET_CONFIG,
    payload: partialObject,
  };
}

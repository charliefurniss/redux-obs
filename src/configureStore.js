import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';

import { appReducer, beersReducer, configReducer } from './reducers';
import { fetchBeersEpic } from './epics';

export const configureStore = () => {
  const rootEpic = combineEpics(fetchBeersEpic);

  const epicMiddleware = createEpicMiddleware();

  const rootReducer = combineReducers({
    app: appReducer,
    beers: beersReducer,
    config: configReducer,
  });

  // Allows to use Redux dev tools
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(epicMiddleware))
  );

  epicMiddleware.run(rootEpic);

  return store;
};

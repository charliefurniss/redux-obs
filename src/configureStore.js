import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';

import { appReducer, beersReducer, configReducer } from './reducers';
import { fetchBeersEpic, hydrateEpic, persistEpic } from './epics';

export const configureStore = (dependencies = {}) => {
  const rootEpic = combineEpics(fetchBeersEpic, persistEpic, hydrateEpic);

  const epicMiddleware = createEpicMiddleware({
    dependencies: {
      getJson: ajax.getJSON,
      document: document,
      ...dependencies,
    },
  });

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

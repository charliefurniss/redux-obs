import { ofType } from 'redux-observable';
import { EMPTY, of } from 'rxjs';
import { ignoreElements, pluck, tap, withLatestFrom } from 'rxjs/operators';
import { SET_CONFIG, setConfig } from '../actions';

const CACHE_KEY = 'ro-config';

export function persistEpic(action$, state$) {
  return action$.pipe(
    ofType(SET_CONFIG),
    withLatestFrom(state$.pipe(pluck('config'))),
    tap(([action, config]) => {
      localStorage.setItem(CACHE_KEY, JSON.stringify(config));
    }),
    ignoreElements() // this tells the epic that it won't produce any actions... it is only a listener
  );
}

export function hydrateEpic() {
  const maybeConfig = localStorage.getItem(CACHE_KEY);

  if (typeof maybeConfig === 'string') {
    try {
      const parsedConfig = JSON.parse(maybeConfig);
      return of(setConfig(parsedConfig));
    } catch (e) {
      return EMPTY; // an observable that returns no values but returns successfully
    }
  }
  return EMPTY;
}

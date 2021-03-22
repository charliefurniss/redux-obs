import { ajax } from 'rxjs/ajax';
import {
  map,
  switchMap,
  debounceTime,
  filter,
  catchError,
  delay,
  mapTo,
  withLatestFrom,
  pluck,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { concat, of, fromEvent, merge, race } from 'rxjs';

import {
  CANCEL,
  fetchFailed,
  fetchFulfilled,
  SEARCH,
  setStatus,
  reset,
} from '../actions';

const createSearchURL = (apiBase, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}`;

export const fetchBeersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    filter(({ payload }) => payload.trim() !== ''),
    withLatestFrom(state$.pipe(pluck('config', 'apiBase'))),
    switchMap(([{ payload }, apiBase]) => {
      const ajax$ = ajax.getJSON(createSearchURL(apiBase, payload)).pipe(
        delay(5000),
        map((response) => fetchFulfilled(response)),
        catchError((err) => of(fetchFailed(err.response.message)))
      );

      const blockers$ = merge(
        action$.pipe(ofType(CANCEL)),
        fromEvent(document, 'keyup').pipe(
          filter((e) => e.key === 'Escape' || e.key === 'Esc')
        )
      ).pipe(mapTo(reset()));

      return concat(of(setStatus('pending')), race(ajax$, blockers$));
    })
  );
};

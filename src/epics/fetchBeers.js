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
import { concat, of, fromEvent, merge, race, forkJoin } from 'rxjs';

import {
  CANCEL,
  fetchFailed,
  fetchFulfilled,
  RANDOM,
  setStatus,
  reset,
} from '../actions';

const createSearchURL = (apiBase, perPage, term) =>
  `${apiBase}?beer_name=${encodeURIComponent(term)}&per_page=${perPage}`;

const createRandomUrl = (apiBase) => `${apiBase}/random`;

export const fetchBeersEpic = (action$, state$) => {
  return action$.pipe(
    ofType(RANDOM),
    debounceTime(500),
    withLatestFrom(state$.pipe(pluck('config'))),
    switchMap(([{ payload }, config]) => {
      const reqs = [...Array(config.perPage)].map(() => {
        return ajax
          .getJSON(createRandomUrl(config.apiBase, config.perPage, payload))
          .pipe(pluck(0));
      });

      const ajax$ = forkJoin(reqs).pipe(
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

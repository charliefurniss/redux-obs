import { ajax } from 'rxjs/ajax';
import { map, switchMap, debounceTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { concat, of } from 'rxjs';

import { fetchFulfilled, SEARCH, setStatus } from '../actions';

const API = 'https://api.punkapi.com/v2/beers';
const createSearchURL = (term) =>
  `${API}?beer_name=${encodeURIComponent(term)}`;

export const fetchBeersEpic = (actions$) => {
  return actions$.pipe(
    ofType(SEARCH),
    debounceTime(500),
    switchMap(({ payload }) => {
      return concat(
        of(setStatus('pending')),
        ajax
          .getJSON(createSearchURL(payload))
          .pipe(map((response) => fetchFulfilled(response)))
      );
    })
  );
};

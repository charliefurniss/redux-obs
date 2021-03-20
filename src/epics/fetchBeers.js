import { ajax } from 'rxjs/ajax';
import { map, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { concat, of } from 'rxjs';

import { fetchFulfilled, FETCH_DATA, setStatus } from '../actions';

const API = 'https://api.punkapi.com/v2/beers';

export const fetchBeersEpic = (actions$) => {
  return actions$.pipe(
    ofType(FETCH_DATA),
    switchMap(() => {
      return concat(
        of(setStatus('pending')),
        ajax.getJSON(API).pipe(map((response) => fetchFulfilled(response)))
      );
    })
  );
};

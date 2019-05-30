import {Injectable} from '@angular/core';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';

import {FormattedApiResponse} from '../auth/models/formattedApiResponse.model';
import {formatData} from '../auth/util/util';
import {RouterActions} from '../router';
import {Routes} from '../router/enum/routes.enum';

import * as ContestActions from './contest.actions';
import {ContestService} from './services/contest.service';

@Injectable()
export class ContestEffects {
  @Effect()
  getContest$ = this.actions$.pipe(
    ofType(ContestActions.Types),
    flatMap((action: ContestActions.GetContest) => [
      new ContestActions.SetFetching(true),
      new ContestActions.QueryContest(action.payload),
    ]),
  );

  @Effect()
  queryContest$ = this.actions$.pipe(
    ofType(ContestActions.Types.QueryContest),
    switchMap((action: ContestActions.QueryContest) =>
      this.contestService.getContest(action.payload).pipe(
        map(formatData),
        catchError(response => of(formatData(response.error))),
        flatMap((formattedData: FormattedApiResponse) => [
          new ContestActions.SetFetching(false),
          new AuthActions.SetIsLoggedIn(formattedData.statusCode === 200),
          new AuthActions.SetStatus(formattedData.status),
          new AuthActions.SetStatusCode(formattedData.statusCode),
          new AuthActions.SetTokenResponseToCookies({item: formattedData.state, rememberMe: action.payload.rememberMe}),
          new RouterActions.Go({path: [formattedData.statusCode === 200 ? Routes.DefaultRoute : Routes.AuthRoute]}),
        ]),
      ),
    ),
  );

  constructor(private actions$: Actions,
              private contestService: ContestService) {}
}

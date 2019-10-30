import {Location} from '@angular/common';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {ofType, Actions, Effect} from '@ngrx/effects';
import {map, tap} from 'rxjs/operators';

import * as StoreActions from './router.actions';

@Injectable()
export class RouterEffects {
    @Effect({dispatch: false})
    go$ = this.actions$.pipe(
        ofType(StoreActions.Types.Go),
        map((action: StoreActions.Go) => action.payload),
        tap(({path, queryParams, extras}) =>
            this.router.navigate(path, {queryParams, ...extras}),
        ),
    );

    @Effect({dispatch: false})
    back$ = this.actions$.pipe(
        ofType(StoreActions.Types.Back),
        tap(() => this.location.back()),
    );

    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location,
    ) {}
}

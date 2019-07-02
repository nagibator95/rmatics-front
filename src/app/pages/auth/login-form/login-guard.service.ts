import { Injectable } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {map, tap} from 'rxjs/operators';

import {AuthSelectors} from '../../../core/stores/auth';
import {RouterActions} from '../../../core/stores/router';
import {Routes} from '../../../core/stores/router/enum/routes.enum';

@Injectable({
  providedIn: 'root',
})
export class LoginGuardService {
  constructor(private store$: Store<any>) {
  }

  canActivate() {
    return this.store$.pipe(
      select(AuthSelectors.getIsLoggedIn()),
      map(value => !value),
      tap(auth => !!auth ? null : this.store$.dispatch(new RouterActions.Go({path: [Routes.DefaultRoute]}))),
    );
  }
}

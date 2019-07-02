import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {tap} from 'rxjs/operators';

import {AuthSelectors} from '../../core/stores/auth';
import {RouterActions} from '../../core/stores/router';
import {Routes} from '../../core/stores/router/enum/routes.enum';

@Injectable()
export class ContestGuardService implements CanActivate {
  constructor(private store$: Store<any>) { }

  canActivate() {
    return this.store$.pipe(
      select(AuthSelectors.getIsLoggedIn()),
      tap(auth => !auth ? this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]})) : null),
    );
  }
}

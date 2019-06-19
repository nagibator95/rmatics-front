import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {map, take, tap} from 'rxjs/operators';

import {AuthSelectors} from '../../core/stores/auth';
import {RouterActions} from '../../core/stores/router';
import {Routes} from '../../core/stores/router/enum/routes.enum';

@Injectable()
export class ContestGuardService implements CanActivate {
  constructor(private store$: Store<any>) { }

  canActivate() {
    return this.store$.pipe(
      select(AuthSelectors.getIsLoggedIn()),
      take(1),
      map(value => !!value),
      // TODO: Проблема в том, что значение в сторе isLoggedIn меняется через цепочку эффектов, а гард берет первое значение (false),
      // не дожидаясь окончания этой цепи, поэтому при наличии гарда получается все время редирект на страницу авторизации - придумать решение
      tap(value => {
        if (!value) {
          this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]}));
        }
      }),
    );
  }
}

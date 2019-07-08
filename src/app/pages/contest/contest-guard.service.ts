import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Store} from '@ngrx/store';

import {NewAuthService} from '../../core/stores/auth/services/new-auth.service';
import {RouterActions} from '../../core/stores/router';
import {Routes} from '../../core/stores/router/enum/routes.enum';

@Injectable()
export class ContestGuardService implements CanActivate {
  constructor(private store$: Store<any>, private auth: NewAuthService) { }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (!this.auth.isLoggedIn) {
      this.auth.redirectUrl = state.url;
      this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]}));
      return false;
    }

    return true;
  }
}

import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';

import {NewAuthService} from '../../../core/stores/auth/services/new-auth.service';
import {RouterActions} from '../../../core/stores/router';
import {Routes} from '../../../core/stores/router/enum/routes.enum';

@Injectable({
    providedIn: 'root',
})
export class LoginGuardService {
    constructor(private store$: Store<any>, private auth: NewAuthService) {}

    canActivate(): boolean {
        if (this.auth.isLoggedIn) {
            this.store$.dispatch(new RouterActions.Go({path: [Routes.DefaultRoute]}));

            return false;
        }

        return true;
    }
}

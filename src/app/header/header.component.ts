import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {select, Store} from '@ngrx/store';

import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AuthSelectors} from '../core/stores/auth';
import {NewAuthService} from '../core/stores/auth/services/new-auth.service';
import {RouterActions} from '../core/stores/router';
import {Routes} from '../core/stores/router/enum/routes.enum';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnDestroy {
    isLoggedIn$: Observable<boolean | null>;
    private destroy$ = new Subject();

    constructor(
        private store$: Store<any>,
        private router: Router,
        private auth: NewAuthService,
    ) {
        this.isLoggedIn$ = this.store$.pipe(
            select(AuthSelectors.getIsLoggedIn()),
            takeUntil(this.destroy$),
        );
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    logout() {
        this.auth
            .logout()
            .subscribe(() =>
                this.store$.dispatch(new RouterActions.Go({path: [Routes.AuthRoute]})),
            );
    }

    navigate(...path: (string | number)[]) {
        if (path[0] === 'contest') {
            this.router.navigate(['contest', path[1]]);
        } else {
            this.store$.dispatch(
                path.length ? new RouterActions.Go({path}) : new RouterActions.Back(),
            );
        }
    }
}

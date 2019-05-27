import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';

import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthActions, AuthSelectors } from '../core/stores/auth';
import { RouterActions } from '../core/stores/router';

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
    private router: Router) {
    this.isLoggedIn$ = this.store$.pipe(select(AuthSelectors.getIsLoggedIn()), takeUntil(this.destroy$));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.store$.dispatch(new AuthActions.Logout());
  }

  navigate(...path: Array<string | number>) {
    if (path[0] === 'contest') {
      this.router.navigate(['contest', { id: path[1]}]);
    } else {
      this.store$.dispatch(path.length ? new RouterActions.Go({ path }) : new RouterActions.Back());
    }
  }
}

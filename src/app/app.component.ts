import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';

import { AuthService } from './api/auth.service';
import {AuthActions, AuthSelectors} from './core/stores/auth';
import {RouterActions} from './core/stores/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean>;

  private readonly destroy$ = new Subject();

  constructor(private auth: AuthService, private changeDetectorRef: ChangeDetectorRef, private store$: Store<any>) {}

  ngOnInit() {
    this.store$.dispatch(new AuthActions.Initialize());
    this.changeDetectorRef.detectChanges();

    this.isLoggedIn$ = this.store$.pipe(select(AuthSelectors.getIsLoggedIn()), takeUntil(this.destroy$));
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (!isLoggedIn) {
        this.store$.dispatch(new RouterActions.Go({
          path: ['/auth/login'],
        }));
      } else {
        this.store$.dispatch(new RouterActions.Go({
          path: ['/demo'],
        }));
      }
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

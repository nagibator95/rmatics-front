import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {filter} from 'rxjs/operators';

import { AuthActions } from './core/stores/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  isInitialLoading = true;
  private readonly destroy$ = new Subject();

  constructor(private store$: Store<any>, private router: Router) {
    console.log(this.router.url);
    this.store$.dispatch(new AuthActions.Initialize());
  }

  ngOnInit() {
    // this.router.events
    //   .pipe(
    //     filter(e => e instanceof NavigationEnd),
    //   )
    //   .subscribe( navEnd => {
    //     if ((navEnd as NavigationEnd).urlAfterRedirects.substring(0, 21) !== '/auth/change-password' && this.isInitialLoading) {
    //       this.store$.dispatch(new AuthActions.Initialize());
    //       this.isInitialLoading = false;
    //     }
    //   });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

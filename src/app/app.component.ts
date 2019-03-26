import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';

import {AuthActions} from './core/stores/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject();

  constructor(private changeDetectorRef: ChangeDetectorRef, private store$: Store<any>) {}

  ngOnInit() {
    this.store$.dispatch(new AuthActions.Initialize());
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

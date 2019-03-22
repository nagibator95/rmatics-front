import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';

import { AuthService } from './api/auth.service';
import {RouterActions} from './core/stores/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  isLoggedIn = this.auth.isLoggedIn;

  constructor(private auth: AuthService, private changeDetectorRef: ChangeDetectorRef, private store$: Store<any>) {
  }

  ngOnInit() {
    this.auth.init();
    this.changeDetectorRef.detectChanges();

    this.isLoggedIn.subscribe(isLoggedIn => {
      console.log(isLoggedIn);
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
}

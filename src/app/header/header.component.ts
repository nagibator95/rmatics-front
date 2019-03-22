import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../api/auth.service';
import {Store} from '@ngrx/store';
import {RouterActions} from '../core/stores/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent {
  isLoggedIn = this.auth.isLoggedIn;

  constructor(private auth: AuthService, private store$: Store<any>) {}

  logout() {
    this.auth.logout();
  }

  navigate(route?: string) {
    this.store$.dispatch(route ? new RouterActions.Go({
      path: [route],
    }) : new RouterActions.Back());
  }
}

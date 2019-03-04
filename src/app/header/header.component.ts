import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HeaderComponent {
  isLoggedIn = this.auth.isLoggedIn;

  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}

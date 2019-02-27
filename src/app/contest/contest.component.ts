import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '../api/auth.service';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestComponent {
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}

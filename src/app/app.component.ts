import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { AuthService } from './api/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit {
  isLoggedIn = this.auth.isLoggedIn;
  changePassword = false;

  constructor(private auth: AuthService, private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.auth.init();
    this.changeDetectorRef.detectChanges();
  }
}

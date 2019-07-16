import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

import {NewAuthService} from './core/stores/auth/services/new-auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isInitialLoading = true;

  constructor(private router: Router, private auth: NewAuthService) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
      )
      .subscribe( navEnd => {
        if ((navEnd as NavigationEnd).urlAfterRedirects.substring(0, 21) !== '/auth/change-password' && this.isInitialLoading) {
          this.auth.initUser();
          const newScript = document.createElement('script');
          newScript.setAttribute('src', './app/shared/jsMath/easy/load.js');

          document.head.appendChild(newScript);
          this.isInitialLoading = false;
        }
      });
  }
}

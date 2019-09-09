import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

import {NewAuthService} from './core/stores/auth/services/new-auth.service';
import {TableSortService} from './pages/monitor/monitor-container/table-sort.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  isInitialLoading = true;
  toShow = false;

  constructor(private router: Router, private auth: NewAuthService, private sortTable: TableSortService) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter(e => e instanceof NavigationEnd),
      )
      .subscribe( navEnd => {
        if (this.isInitialLoading) {
          this.sortTable.isSortSaved = (navEnd as NavigationEnd).urlAfterRedirects.split('/').filter(param => param === 'results').length !== 0;
        }

        if ((navEnd as NavigationEnd).urlAfterRedirects.substring(0, 21) !== '/auth/change-password' && this.isInitialLoading) {
          this.auth.initUser();
          this.isInitialLoading = false;
        }
      });

    setTimeout(() => {
      this.toShow = true;
    }, 2000);
  }
}

import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {filter} from 'rxjs/operators';

import {NewAuthService} from './core/stores/auth/services/new-auth.service';
import {TableSortService} from './pages/monitor/monitor-container/table-sort.service';
import {AlertService} from './shared/services/alert.service';
import {MessageComponent} from './ui/message/message.component';

@Component({
    selector: 'app-root',
    styleUrls: ['./app.component.scss'],
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    isInitialLoading = true;

    constructor(
        private router: Router,
        private auth: NewAuthService,
        private sortTable: TableSortService,
        private alertService: AlertService,
    ) {}

    ngOnInit() {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))

            .subscribe(navEnd => {
                if (this.isInitialLoading) {
                    this.sortTable.isSortSaved =
                        (navEnd as NavigationEnd).urlAfterRedirects
                            .split('/')
                            .filter(param => param === 'results').length !== 0;
                }

                if (
                    (navEnd as NavigationEnd).urlAfterRedirects.substring(0, 21) !==
                        '/auth/change-password' &&
                    this.isInitialLoading
                ) {
                    this.auth.initUser();
                    this.isInitialLoading = false;
                }
            });

        setTimeout(() => {
            let inputs = {
                status: 'success',
                text: 'Информационное сообщение',
            };

            this.alertService.showNotification(MessageComponent, inputs);
        }, 1000);
    }
}

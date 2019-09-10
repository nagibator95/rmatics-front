import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContestGuardService} from './pages/contest/contest-guard.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'workshop/1',
        pathMatch: 'full',
    },
    // {
    //   path: 'demo',
    //   loadChildren: './pages/demo/demo.module#DemoModule',
    // },
    {
        path: 'contest',
        loadChildren: './pages/contest/contest.module#ContestModule',
        canActivate: [ContestGuardService],
    },
    {
        path: 'workshop/:workshopId',
        loadChildren: './pages/monitor/monitor.module#MonitorModule',
        canActivate: [ContestGuardService],
    },
    {
        path: 'auth',
        loadChildren: './pages/auth/auth.module#AuthModule',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}

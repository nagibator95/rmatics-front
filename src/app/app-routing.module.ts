import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginFormComponent } from './login/login-form/login-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule',
  },
  {
    path: 'login',
    component: LoginFormComponent,
  },
  {
    path: 'contest',
    loadChildren: './contest/contest.module#ContestModule',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {
}

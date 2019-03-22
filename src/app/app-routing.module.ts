import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule',
  },
  {
    path: 'contest',
    loadChildren: './contest/contest.module#ContestModule',
  },
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule',
  },
  // {
  //   path: 'auth',
  //   redirectTo: '/auth/login',
  //   pathMatch: 'full',
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})

export class AppRoutingModule {
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'demo',
    loadChildren: './pages/demo/demo.module#DemoModule',
  },
  {
    path: 'contest',
    loadChildren: './pages/contest/contest.module#ContestModule',
  },
  {
    path: 'auth',
    loadChildren: './pages/auth/auth.module#AuthModule',
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

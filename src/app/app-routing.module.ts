import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  {
    path: 'demo',
    loadChildren: './demo/demo.module#DemoModule',
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

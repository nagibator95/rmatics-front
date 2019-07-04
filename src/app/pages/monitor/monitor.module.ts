import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';

import { MonitorComponent } from './monitor.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
    children: [
      {
        path: '',
        redirectTo: 'content',
      },
      {
        path: 'content',
        loadChildren: './workshop/workshop.module#WorkshopModule',
      },
      {
        path: 'results',
        loadChildren: './monitor-container/monitor-container.module#MonitorContainerModule',
      },
    ],
  },
];

@NgModule({
  declarations: [
    MonitorComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    UiModule,
  ],
  exports: [
    MonitorComponent,
  ],
})
export class MonitorModule { }

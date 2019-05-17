import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';

import { WorkshopComponent } from './workshop.component';
import { IconLinksComponent } from './icon-links/icon-links.component';

const routes: Routes = [
  {
    path: '',
    component: WorkshopComponent,
  },
  {
    path: ':workshopId',
    component: WorkshopComponent,
  },
];

@NgModule({
  declarations: [
    WorkshopComponent,
    IconLinksComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    UiModule,
  ],
  exports: [
    WorkshopComponent,
  ],
})
export class WorkshopModule { }

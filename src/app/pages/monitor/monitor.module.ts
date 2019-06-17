import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from 'src/app/shared/shared.module';
import { UiModule } from 'src/app/ui/ui.module';

import { MinuteSecondsPipe } from './minute-seconds.pipe';
import { MonitorComponent } from './monitor.component';
import { StatusComponent } from './status/status.component';
import { ScrollableDirective } from './table/scrollable.directive';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: MonitorComponent,
  },
];

@NgModule({
  declarations: [
    MonitorComponent,
    TableComponent,
    ScrollableDirective,
    StatusComponent,
    MinuteSecondsPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    UiModule,
  ],
  exports: [
    MonitorComponent,
  ]
})
export class MonitorModule { }

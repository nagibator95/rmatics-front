import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { TaskItemComponent } from './task-menu/task-item/task-item.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';

@NgModule({
  declarations: [
    TaskMenuComponent,
    TaskItemComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    TaskMenuComponent,
  ],
})
export class SectionsModule { }

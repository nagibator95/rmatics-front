import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { PackageStatusComponent } from './sent-packages/package-status/package-status.component';
import { SentPackagesComponent } from './sent-packages/sent-packages.component';
import { CodeBlockComponent } from './task-main/code-block/code-block.component';
import { IconLabelComponent } from './task-main/icon-label/icon-label.component';
import { PaginationComponent } from './task-main/pagination/pagination.component';
import { TaskMainComponent } from './task-main/task-main.component';
import { TaskItemComponent } from './task-menu/task-item/task-item.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';

@NgModule({
  declarations: [
    TaskMenuComponent,
    TaskItemComponent,
    IconLabelComponent,
    CodeBlockComponent,
    TaskMainComponent,
    PaginationComponent,
    SentPackagesComponent,
    PackageStatusComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    TaskMenuComponent,
    TaskMainComponent,
    SentPackagesComponent,
  ],
})
export class SectionsModule { }

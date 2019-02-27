import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SectionsModule } from '../sections/sections.module';

import { ContestComponent } from './contest.component';
import { TaskComponent } from './task/task.component';

@NgModule({
  declarations: [
    ContestComponent,
    TaskComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SectionsModule,
  ],
  exports: [
    ContestComponent,
    TaskComponent,
  ],
})

export class ContestModule {
}

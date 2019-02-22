import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { ConditionsComponent } from './conditions/conditions.component';
import { TaskItemComponent } from './task-menu/task-item/task-item.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { IconLabelComponent } from './conditions/icon-label/icon-label.component';
import { CodeBlockComponent } from './conditions/code-block/code-block.component';

@NgModule({
  declarations: [
    TaskMenuComponent,
    TaskItemComponent,
    ConditionsComponent,
    IconLabelComponent,
    CodeBlockComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
  ],
  exports: [
    TaskMenuComponent,
    ConditionsComponent,
  ],
})
export class SectionsModule { }

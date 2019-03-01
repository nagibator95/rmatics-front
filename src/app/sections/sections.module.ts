import 'codemirror/mode/clike/clike';
import 'codemirror/mode/haskell/haskell';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/pascal/pascal';
import 'codemirror/mode/perl/perl';
import 'codemirror/mode/php/php';
import 'codemirror/mode/python/python';
import 'codemirror/mode/ruby/ruby';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { ControlsModule } from '../controls/controls.module';
import { SharedModule } from '../shared/shared.module';

import { PackageStatusComponent } from './sent-packages/package-status/package-status.component';
import { SentPackagesComponent } from './sent-packages/sent-packages.component';
import { CodeBlockComponent } from './task-main/code-block/code-block.component';
import { IconLabelComponent } from './task-main/icon-label/icon-label.component';
import { PaginationComponent } from './task-main/pagination/pagination.component';
import { TaskMainComponent } from './task-main/task-main.component';
import { TaskItemComponent } from './task-menu/task-item/task-item.component';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { TaskSolutionComponent } from './task-solution/task-solution.component';

@NgModule({
  declarations: [
    TaskMenuComponent,
    TaskItemComponent,
    IconLabelComponent,
    CodeBlockComponent,
    TaskMainComponent,
    PaginationComponent,
    TaskSolutionComponent,
    SentPackagesComponent,
    PackageStatusComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    ControlsModule,
    FormsModule,
    CodemirrorModule,
  ],
  exports: [
    TaskMenuComponent,
    TaskMainComponent,
    SentPackagesComponent,
    TaskSolutionComponent,
  ],
})

export class SectionsModule {
}

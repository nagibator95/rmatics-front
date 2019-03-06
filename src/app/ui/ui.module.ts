import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { SharedModule } from '../shared/shared.module';

import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    TabsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    CodemirrorModule,
  ],
  exports: [
    TabsComponent,
  ],
})
export class UiModule { }

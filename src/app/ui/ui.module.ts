import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

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
  ],
  exports: [
    TabsComponent,
  ],
})
export class UiModule { }

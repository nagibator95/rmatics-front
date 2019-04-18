import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CodemirrorModule } from '@ctrl/ngx-codemirror';

import { SharedModule } from '../shared/shared.module';

import { ControlsModule } from './controls/controls.module';
import { RadioGroupComponent } from './radio-group/radio-group.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  declarations: [
    TabsComponent,
    RadioGroupComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ControlsModule,
    CodemirrorModule,
  ],
  exports: [
    TabsComponent,
    RadioGroupComponent,
  ],
})
export class UiModule { }

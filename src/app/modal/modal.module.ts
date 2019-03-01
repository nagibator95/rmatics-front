import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';

import { DynamicHostDirective } from './dynamic-host.directive';
import { ModalComponent } from './modal.component';

@NgModule({
  declarations: [
    ModalComponent,
    DynamicHostDirective,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    ModalComponent,
  ],
})
export class ModalModule { }

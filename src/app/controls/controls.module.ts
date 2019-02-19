import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    InputComponent,
    CheckboxComponent,
  ],
  exports: [
    InputComponent,
    CheckboxComponent,
  ],
})

export class ControlsModule {
}

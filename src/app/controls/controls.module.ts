import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
  ],
  declarations: [
    InputComponent,
    CheckboxComponent,
    RadioComponent,
  ],
  exports: [
    InputComponent,
    CheckboxComponent,
    RadioComponent,
  ],
})

export class ControlsModule {
}

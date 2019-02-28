import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { CheckboxComponent } from './checkbox/checkbox.component';
import { InputComponent } from './input/input.component';
import { RadioComponent } from './radio/radio.component';
import { SelectComponent } from './select/select.component';
import { UploadComponent } from './upload/upload.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    UploadComponent,
    SelectComponent,
  ],
  exports: [
    InputComponent,
    CheckboxComponent,
    RadioComponent,
    UploadComponent,
    SelectComponent,
  ],
})

export class ControlsModule {
}

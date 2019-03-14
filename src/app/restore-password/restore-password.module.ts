import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {SharedModule} from '../shared/shared.module';
import {UiModule} from '../ui/ui.module';

import {RestorePasswordComponent} from './restore-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    UiModule,
  ],
  declarations: [RestorePasswordComponent],
  exports:  [RestorePasswordComponent],
})
export class RestorePasswordModule { }

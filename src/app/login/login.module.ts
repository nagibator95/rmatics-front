import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { ControlsModule } from '../controls/controls.module';
import { SharedModule } from '../shared/shared.module';

import { LoginFormComponent } from '../pages/auth/login-form/login-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ControlsModule,
    FormsModule,
  ],
  declarations: [
    LoginFormComponent,
  ],
  exports: [
    LoginFormComponent,
  ],
})

export class LoginModule {
}

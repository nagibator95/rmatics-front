import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../../shared/shared.module';
import {ControlsModule} from '../../ui/controls/controls.module';
import {UiModule} from '../../ui/ui.module';

import { AuthComponent } from './auth.component';
import { ChangePasswordFormComponent } from './change-password-form/change-password-form.component';
import { LoginFormComponent } from './login-form/login-form.component';
import {LoginGuardService} from './login-form/login-guard.service';
import { RestorePasswordFormComponent } from './restore-password-form/restore-password-form.component';
import { AuthFooterComponent } from './shared/auth-footer/auth-footer.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      { path: '', redirectTo: 'login' },
      { path: 'login', canActivate: [LoginGuardService], component: LoginFormComponent },
      { path: 'restore-password', component: RestorePasswordFormComponent },
      { path: 'change-password', component: ChangePasswordFormComponent },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ControlsModule,
    FormsModule,
    UiModule,
  ],
  declarations: [
    AuthComponent,
    LoginFormComponent,
    RestorePasswordFormComponent,
    ChangePasswordFormComponent,
    AuthFooterComponent,
  ],
  exports: [
    AuthComponent,
    LoginFormComponent,
    RestorePasswordFormComponent,
    ChangePasswordFormComponent,
    AuthFooterComponent,
  ],
})
export class AuthModule { }

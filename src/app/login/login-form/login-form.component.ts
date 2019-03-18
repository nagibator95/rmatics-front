import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../api/auth.service';
import {TELEGRAM_LINK} from '../../core/constants/links';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginFormComponent implements OnInit {
  @Output() changePasswordChange = new EventEmitter();
  loginForm = new FormGroup({});
  isFormSubmitted = false;
  telegramLink = TELEGRAM_LINK;
  error = this.auth.error;
  isFetching = this.auth.isFetching;
  rememberMe = true;

  private toChangePassword: boolean;

  constructor(private fb: FormBuilder, private auth: AuthService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group(
      {
        login: ['', [
          Validators.required,
        ]],
        password: ['', [
          Validators.required,
        ]],
      },
    );
  }

  @Input()
  get changePassword() {
    return this.toChangePassword;
  }

  set changePassword(value: boolean) {
    this.changePasswordChange.emit(value);
  }

  get login() {
    return this.loginForm.get('login') as AbstractControl;
  }

  get password() {
    return this.loginForm.get('password')  as AbstractControl;
  }

  handleInputChange() {
    this.auth.clearError();
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      this.auth.login({ username: this.login.value, password: this.password.value }, this.rememberMe);
    }
  }

  onChangePasswordClick() {
    console.log(this.changePassword);

    this.changePassword = true;
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../../api/auth.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({});
  isFormSubmitted = false;
  telegramLink = 'https://t.me/joinchat/AAAAAECFqTNMd00Y93MX8Q';
  error = this.auth.error;
  isFetching = this.auth.isFetching;
  rememberMe = true;

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
}

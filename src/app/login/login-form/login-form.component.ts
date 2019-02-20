import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginFormComponent implements OnInit {
  loginForm = new FormGroup({});
  isFormSubmitted = false;

  constructor(private fb: FormBuilder) { }

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
    return this.loginForm.get('login');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onSubmit() {
    this.isFormSubmitted = true;
    if (this.loginForm.valid) {
      console.log(true);
    }
  }
}

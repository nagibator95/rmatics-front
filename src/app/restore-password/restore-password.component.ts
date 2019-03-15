import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';

import {AuthService} from '../api/auth.service';
import {TELEGRAM_LINK} from '../core/constants/links';
import {RadioButton} from '../ui/radio-group/radio-group.component';

@Component({
  selector: 'app-restore-password',
  templateUrl: './restore-password.component.html',
  styleUrls: ['./restore-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestorePasswordComponent implements OnInit {
  restorePasswordForm: FormGroup;
  isFormSubmitted = false;
  telegramLink = TELEGRAM_LINK;
  byLogin = true;
  error = this.auth.error;
  isFetching = this.auth.isFetching;
  isPasswordChangeSucceed = this.auth.isPasswordChangeSucceed;
  isPasswordChangeFinished = this.auth.isPasswordChangeFinished;

  radioButtons: RadioButton[] = [
    {
      text: 'По логину',
      onClickHandler: () => this.switchSubmitWay(true),
    },
    {
      text: 'По email',
      onClickHandler: () => this.switchSubmitWay(false),
    },
  ];

  constructor(private formBuilder: FormBuilder, private auth: AuthService) {
    this.restorePasswordForm = this.formBuilder.group(
      {
        loginOrEmail: ['', [
          Validators.required,
        ]],
      },
    );
  }

  ngOnInit() {}

  get loginOrEmail() {
    return this.restorePasswordForm.get('loginOrEmail') as AbstractControl;
  }

  switchSubmitWay(byLogin: boolean) {
   this.byLogin = byLogin;
  }

  handleInputChange() {
    this.isFormSubmitted = false;

    this.auth.clearError();
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.restorePasswordForm.valid) {
      this.auth.changePassword(this.byLogin ? {username: this.loginOrEmail.value} : {email: this.loginOrEmail.value});
    }
  }
}

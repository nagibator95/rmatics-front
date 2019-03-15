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
  telegramLink = TELEGRAM_LINK;
  byLogin = true;
  error = this.auth.error;
  isFetching = this.auth.isFetching;

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
    this.auth.clearError();
  }

  onSubmit() {
    if (this.restorePasswordForm.valid) {
      this.auth.changePassword(this.byLogin ? {username: this.loginOrEmail.value} : {email: this.loginOrEmail.value});
    }
  }
}

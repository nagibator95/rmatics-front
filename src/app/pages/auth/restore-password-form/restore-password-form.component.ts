import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';

import {NewAuthService} from '../../../core/stores/auth/services/new-auth.service';
import {RadioButton} from '../../../ui/radio-group/radio-group.component';

@Component({
  selector: 'app-restore-password-form',
  templateUrl: './restore-password-form.component.html',
  styleUrls: ['./restore-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RestorePasswordFormComponent implements OnInit, OnDestroy {
  restorePasswordForm: FormGroup;
  isFormSubmitted = false;
  byLogin = true;
  isFetching = false;
  error = '';
  isPasswordRestoreFinished = false;

  radioButtons: RadioButton[] = [
    {
      text: 'По логину',
      onClickHandler: () => {
        this.isFormSubmitted = false;
        this.switchSubmitWay(true);
      },
    },
    {
      text: 'По email',
      onClickHandler: () => {
        this.isFormSubmitted = false;
        this.switchSubmitWay(false);
      },
    },
  ];
  private readonly destroy$ = new Subject();

  constructor(private formBuilder: FormBuilder,
              private auth: NewAuthService,
              private cd: ChangeDetectorRef) {
    this.restorePasswordForm = this.formBuilder.group(
      {
        loginOrEmail: ['', [
          Validators.required,
        ]],
      },
    );
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get loginOrEmail() {
    return this.restorePasswordForm.get('loginOrEmail') as AbstractControl;
  }

  switchSubmitWay(byLogin: boolean) {
    this.byLogin = byLogin;
  }

  handleInputChange() {
    this.isFormSubmitted = false;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.restorePasswordForm.valid) {
      this.isFetching = true;
      this.isPasswordRestoreFinished = false;
      this.error = '';

      this.auth.restorePassword( { [this.byLogin ? 'username' : 'email']: this.loginOrEmail.value})
        .pipe(
          finalize(() => {
            this.isFetching = false;
            this.isPasswordRestoreFinished = true;
            this.cd.markForCheck();
          }),
          takeUntil(this.destroy$),
          catchError(response => this.error = response.error.error),
        )
        .subscribe();
    }
  }
}

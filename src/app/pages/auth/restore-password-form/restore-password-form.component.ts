import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TELEGRAM_LINK} from '../../../core/constants/links';
import {AuthActions, AuthSelectors} from '../../../core/stores/auth';
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
  telegramLink = TELEGRAM_LINK;
  byLogin = true;
  isFetching$: Observable<boolean | null>;
  error$: Observable<string | null>;
  isPasswordRestoreFinished$: Observable<boolean | null>;

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

  constructor(private formBuilder: FormBuilder, private store$: Store<any>) {
    this.restorePasswordForm = this.formBuilder.group(
      {
        loginOrEmail: ['', [
          Validators.required,
        ]],
      },
    );

    this.isFetching$ = this.store$.pipe(
      select(AuthSelectors.getFetching()),
      takeUntil(this.destroy$));

    this.error$ = this.store$.pipe(
      select(AuthSelectors.getError()),
      takeUntil(this.destroy$),
    );

    this.isPasswordRestoreFinished$ = this.store$.pipe(
      select(AuthSelectors.getIsPasswordRestoreFinished()),
      takeUntil(this.destroy$),
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
      this.store$.dispatch(new AuthActions.RestorePassword(this.byLogin ? {username: this.loginOrEmail.value} : {email: this.loginOrEmail.value}));
    }
  }
}

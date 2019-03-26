import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {TELEGRAM_LINK} from '../../../core/constants/links';
import {AuthActions, AuthSelectors} from '../../../core/stores/auth';
import {RouterActions} from '../../../core/stores/router';
import {Routes} from '../../../core/stores/router/enum/routes.enum';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LoginFormComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup({});
  telegramLink = TELEGRAM_LINK;
  error$: Observable<boolean>;
  isFetching$: Observable<boolean>;
  rememberMe = true;
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private store$: Store<any>) {
    this.isFetching$ = this.store$.pipe(
      select(AuthSelectors.getFetching()),
      takeUntil(this.destroy$));

    this.error$ = this.store$.pipe(
      select(AuthSelectors.getError()),
      takeUntil(this.destroy$),
    );
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get login() {
    return this.loginForm.get('login') as AbstractControl;
  }

  get password() {
    return this.loginForm.get('password')  as AbstractControl;
  }

  handleInputChange() {
    this.store$.dispatch(new AuthActions.SetError(''));
  }

  onChangePasswordClick() {
    this.store$.dispatch(new RouterActions.Go({
      path: [Routes.RestorePasswordRoute],
    }));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.store$.dispatch(new AuthActions.Login({
        authData: {username: this.login.value, password: this.password.value},
        rememberMe: this.rememberMe,
      }));
    }
  }
}

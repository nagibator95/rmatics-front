import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store} from '@ngrx/store';
import { Subject} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';

import {NewAuthService} from '../../../core/stores/auth/services/new-auth.service';
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
  rememberMe = true;
  private readonly destroy$ = new Subject();
  error = '';
  isFetching = false;

  constructor(private fb: FormBuilder, private store$: Store<any>, private auth: NewAuthService) {}

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
    this.error = '';
  }

  onChangePasswordClick() {
    this.store$.dispatch(new RouterActions.Go({
      path: [Routes.RestorePasswordRoute],
    }));
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isFetching = true;

      this.auth.login({username: this.login.value, password: this.password.value})
        .pipe(
          finalize(() => this.isFetching = false),
          takeUntil(this.destroy$),
          catchError(response => this.error = response.error.error),
        )
        .subscribe(() => {
          if (this.auth.redirectUrl) {
            let queryParams = {};
            if (this.auth.redirectUrl.split('?').length > 1) {
              queryParams = this.sortParams(this.auth.redirectUrl);
            }

            this.store$.dispatch(new RouterActions.Go({
              path: [this.auth.redirectUrl.split('?')[0]],
              queryParams,
            }));
          }
        });
    }
  }

  private sortParams(link: string): any {
    const queryParams = link.split('?')[1];
    const params = queryParams.split('&');
    let pair = null;
    const data = {} as any;
    params.forEach(d => {
      pair = d.split('=');
      data[`${pair[0]}`] = pair[1];
    });
    return data;
  }
}

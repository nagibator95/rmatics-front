import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {AuthActions, AuthSelectors} from '../../../core/stores/auth';

@Component({
  selector: 'app-change-password-form',
  templateUrl: './change-password-form.component.html',
  styleUrls: ['./change-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent implements OnInit {
  isFormSubmitted = false;
  changePasswordForm = new FormGroup({});
  error$: Observable<string | null>;
  isFetching$: Observable<boolean | null>;
  email$: Observable<string | null>;
  isPasswordChangeFinished$: Observable<boolean | null>;
  queryParams: Params;
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private store$: Store<any>, private activatedRoute: ActivatedRoute) {
    this.isFetching$ = this.store$.pipe(
      select(AuthSelectors.getFetching()),
      takeUntil(this.destroy$));

    this.error$ = this.store$.pipe(
      select(AuthSelectors.getError()),
      takeUntil(this.destroy$),
    );

    this.email$ = this.store$.pipe(
      select(AuthSelectors.getEmail()),
      takeUntil(this.destroy$),
    );

    this.isPasswordChangeFinished$ = this.store$.pipe(
      select(AuthSelectors.getIsPasswordChangeFinished()),
      takeUntil(this.destroy$),
    );

    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }

  ngOnInit() {
    this.changePasswordForm = this.fb.group(
      {
        password: ['', [
          Validators.required,
        ]],
        passwordRepeat: ['', [
          Validators.required,
        ]],
      },
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get password() {
    return this.changePasswordForm.get('password') as AbstractControl;
  }

  get passwordRepeat() {
    return this.changePasswordForm.get('passwordRepeat') as AbstractControl;
  }

  handleInputChange() {
    this.isFormSubmitted = false;
  }

  onSubmit() {
    this.isFormSubmitted = true;

    if (this.changePasswordForm.valid) {
        this.store$.dispatch(new AuthActions.ChangePassword({password: this.password.value, params: this.queryParams}));
    }
  }
}

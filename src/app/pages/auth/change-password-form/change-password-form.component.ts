import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
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
  changePasswordForm = new FormGroup({});
  error$: Observable<string | null>;
  isFetching$: Observable<boolean | null>;
  email$: Observable<string | null>;
  private readonly destroy$ = new Subject();

  constructor(private fb: FormBuilder, private store$: Store<any>) {
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
    this.store$.dispatch(new AuthActions.SetError(''));
  }

  onSubmit() {
    if (this.changePasswordForm.valid) {
        // new action from store
    }
  }
}

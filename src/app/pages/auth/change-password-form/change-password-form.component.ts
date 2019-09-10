import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    ValidationErrors,
    Validators,
} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Store} from '@ngrx/store';
import {Subject} from 'rxjs';
import {catchError, finalize, takeUntil} from 'rxjs/operators';

import {NewAuthService} from '../../../core/stores/auth/services/new-auth.service';
import {RouterActions} from '../../../core/stores/router';
import {Routes} from '../../../core/stores/router/enum/routes.enum';

export function checkPasswords(group: FormGroup): ValidationErrors {
    const password = group.controls.password.value;
    const passwordRepeat = group.controls.passwordRepeat.value;

    return password === passwordRepeat ? null : {notSame: true};
}

@Component({
    selector: 'app-change-password-form',
    templateUrl: './change-password-form.component.html',
    styleUrls: ['./change-password-form.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChangePasswordFormComponent implements OnInit {
    isFormSubmitted = false;
    changePasswordForm = new FormGroup({});
    error = '';
    isFetching = false;
    isPasswordChangeFinished = false;
    queryParams: Params = {};
    private readonly destroy$ = new Subject();

    constructor(
        private fb: FormBuilder,
        private store$: Store<any>,
        private activatedRoute: ActivatedRoute,
        private auth: NewAuthService,
        private cd: ChangeDetectorRef,
    ) {
        this.activatedRoute.queryParams.subscribe(params => {
            this.queryParams = params;
        });
    }

    ngOnInit() {
        this.changePasswordForm = this.fb.group(
            {
                password: ['', [Validators.required]],
                passwordRepeat: ['', [Validators.required]],
            },
            {
                validators: checkPasswords,
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

    onBackButtonClicked() {
        this.store$.dispatch(new RouterActions.Go({path: [Routes.DefaultRoute]}));
    }

    onSubmit() {
        this.isFormSubmitted = true;

        if (this.changePasswordForm.valid) {
            this.isFetching = true;
            this.isPasswordChangeFinished = false;
            this.error = '';

            this.auth
                .changePassword({password: this.password.value}, this.queryParams)
                .pipe(
                    finalize(() => {
                        this.isFetching = false;
                        this.isPasswordChangeFinished = true;
                        this.cd.markForCheck();
                    }),
                    takeUntil(this.destroy$),
                    catchError(response => (this.error = response.error.error)),
                )
                .subscribe();
        }
    }
}

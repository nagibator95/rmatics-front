import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AuthEffects} from './auth.effects';
import {authReducer} from './auth.reducer';
import {AuthService} from './services/auth.service';

export const AUTH_STORE = 'AUTH_STORE';

@NgModule({
    imports: [
        EffectsModule.forFeature([AuthEffects]),
        StoreModule.forFeature(AUTH_STORE, authReducer),
    ],
    providers: [AuthService],
})
export class AuthStoreModule {}

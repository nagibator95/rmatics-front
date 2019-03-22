import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AuthEffects} from './auth.effects';
import {authReducer} from './auth.reducer';

export const AUTH_STORE = 'AUTH_STORE';

@NgModule({
  imports: [
    StoreModule.forFeature(AUTH_STORE, authReducer),
    EffectsModule.forFeature([AuthEffects])],
})
export class AuthStoreModule { }

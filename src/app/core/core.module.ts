import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

import {AuthStoreModule} from './stores/auth';
import {ContestStoreModule} from './stores/contest';
import {RouterStoreModule} from './stores/router';

const STORE_MODULES = [RouterStoreModule, AuthStoreModule, ContestStoreModule];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    STORE_MODULES,
    StoreModule .forRoot({}),
    EffectsModule .forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
})
export class CoreModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

import {AuthStoreModule} from './stores/auth';
import {RouterStoreModule} from './stores/router/router-store.module';

const STORE_MODULES = [RouterStoreModule, AuthStoreModule];

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
export class CoreModule { }

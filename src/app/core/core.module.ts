import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

import { environment } from '../../environments/environment';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule .forRoot({}),
    EffectsModule .forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 15,
      logOnly: environment.production,
    }),
  ],
})
export class CoreModule { }

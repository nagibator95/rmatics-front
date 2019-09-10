import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {
    routerReducer,
    RouterStateSerializer,
    StoreRouterConnectingModule,
} from '@ngrx/router-store';
import {StoreModule} from '@ngrx/store';

import {RouterEffects} from './router.effects';
import {CustomSerializer} from './router.serializer';

export const ROUTER_STORE = 'ROUTER_STORE';

@NgModule({
    declarations: [],
    imports: [
        StoreModule.forFeature(ROUTER_STORE, routerReducer),
        StoreRouterConnectingModule.forRoot({
            stateKey: ROUTER_STORE,
        }),
        EffectsModule.forFeature([RouterEffects]),
    ],
    providers: [{provide: RouterStateSerializer, useClass: CustomSerializer}],
})
export class RouterStoreModule {}

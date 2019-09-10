import {Params, RouterStateSnapshot} from '@angular/router';
import {RouterReducerState, RouterStateSerializer} from '@ngrx/router-store';

export interface IRouterStateUrl {
    url: string;
    params: Params;
    queryParams: Params;
}

export type RouterState = RouterReducerState<IRouterStateUrl>;

export class CustomSerializer implements RouterStateSerializer<IRouterStateUrl> {
    serialize(routerState: RouterStateSnapshot): IRouterStateUrl {
        let route = routerState.root;

        while (route.firstChild) {
            route = route.firstChild;
        }

        const {
            url,
            root: {queryParams},
        } = routerState;
        const {params} = route;

        return {url, params, queryParams};
    }
}

import {NavigationExtras, Params} from '@angular/router';

export interface IGoPayload {
  path: any[];
  queryParams?: Params;
  extras?: NavigationExtras;
}

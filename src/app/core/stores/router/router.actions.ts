import {Action} from '@ngrx/store';

import {IGoPayload} from './models/goPayload.model';

export enum Types {
  Go = '[Router] Go',
  Back = '[Router] Back',
}

export class Go implements Action {
  readonly type = Types.Go;

  constructor(public payload: IGoPayload) {}
}

export class Back implements Action {
  readonly type = Types.Back;
}

export type All = Go | Back;

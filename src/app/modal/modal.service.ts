import { ReplaySubject } from 'rxjs';

import { Injectable, Type } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private subject = new ReplaySubject<Type<{}>>();

  constructor() { }

  subscribe = (func: ((value: Type<{}>) => void) | undefined) => this.subject.subscribe(func);

  open = (val: Type<{}>) => this.subject.next(val);
}

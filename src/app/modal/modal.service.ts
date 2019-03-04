import { ReplaySubject } from 'rxjs';

import { Injectable, Type } from '@angular/core';

import { ModalContent } from './modal-content';

interface ModalValue<T> {
  component: Type<ModalContent<T>>;
  data: T | undefined;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  subject = new ReplaySubject<ModalValue<{}> | null>();

  constructor() { }

  subscribe = (func: (value: ModalValue<{}> | null) => void) => this.subject.subscribe(func);

  open = <I>(val: ModalValue<I>) => this.subject.next(val);

  close = () => this.subject.next(null);
}

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

  private htmlNode = document.querySelector('body');

  constructor() { }

  subscribe = (func: (value: ModalValue<{}> | null) => void) => this.subject.subscribe(func);

  open = <I>(val: ModalValue<I>) => {
    if (this.htmlNode) {
      this.htmlNode.classList.add('app-no-scroll') ;
    }
    this.subject.next(val);
  }

  close = () => {
    if (this.htmlNode) {
      this.htmlNode.classList.remove('app-no-scroll');
    }
    this.subject.next(null);
  }
}

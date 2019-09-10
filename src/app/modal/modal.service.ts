import {Injectable, Type} from '@angular/core';

import {ReplaySubject} from 'rxjs';

import {ModalContent} from './modal-content';

interface IModalValue<T> {
    component: Type<ModalContent<T>>;
    data?: T;
}

@Injectable({
    providedIn: 'root',
})
export class ModalService {
    subject = new ReplaySubject<IModalValue<{}> | null>();

    private htmlNode = document.querySelector('body');

    constructor() {}

    subscribe = (func: (value: IModalValue<{}> | null) => void) =>
        this.subject.subscribe(func);

    open = <I>(val: IModalValue<I>) => {
        if (this.htmlNode) {
            this.htmlNode.classList.add('app-no-scroll');
        }

        this.subject.next(val);
    };

    close = () => {
        if (this.htmlNode) {
            this.htmlNode.classList.remove('app-no-scroll');
        }

        this.subject.next(null);
    };
}

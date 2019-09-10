import {Inject, InjectionToken} from '@angular/core';

export const MODAL_DATA = new InjectionToken('modalData');

export class ModalContent<I> {
    constructor(@Inject(MODAL_DATA) protected data?: I) {}
}

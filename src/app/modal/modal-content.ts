import { Inject, InjectionToken } from '@angular/core';

export const ModalData = new InjectionToken('modalData');

export class ModalContent<I> {
  constructor(@Inject(ModalData) protected data: I) {
  }
}

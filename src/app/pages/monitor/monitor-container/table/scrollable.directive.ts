import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
    selector: '[scrollLeft]',
})
export class ScrollableDirective {
    @Output() scrollLeft: EventEmitter<number> = new EventEmitter();

    constructor() {}

    @HostListener('scroll', ['$event.target'])
    onScroll(hostEl: any) {
        this.scrollLeft.emit(hostEl.scrollLeft);
    }
}

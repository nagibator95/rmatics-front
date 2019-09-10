import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-radio',
    templateUrl: './radio.component.html',
    styleUrls: ['./radio.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioComponent {
    @Input() reverse = false;
    @Input() name = '';
    @Input() hasError = false;
    @Input() label = '';
    @Input() checked = false;
    @Input() disabled = false;
    @Output() change = new EventEmitter();

    constructor() {}

    check(event: Event) {
        event.stopPropagation();
        this.checked = !this.checked;
        this.change.emit(this.checked);
    }
}

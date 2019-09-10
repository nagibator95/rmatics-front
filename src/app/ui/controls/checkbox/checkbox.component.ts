import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent {
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

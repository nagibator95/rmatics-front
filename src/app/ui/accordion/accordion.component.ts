import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccordionComponent implements OnInit {
    @Input() titleMain = '';
    @Input() titleExtra = '';

    @HostBinding('class._open') @Input() open = false;

    constructor() {}

    ngOnInit() {}
}

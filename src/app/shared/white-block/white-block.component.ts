import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Input,
    OnInit,
} from '@angular/core';

@Component({
    selector: 'app-white-block',
    templateUrl: './white-block.component.html',
    styleUrls: ['./white-block.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhiteBlockComponent implements OnInit {
    @HostBinding('class._border') @Input() border = false;

    constructor() {}

    ngOnInit() {}
}

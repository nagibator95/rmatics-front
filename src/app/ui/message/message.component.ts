import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';

type MessageStatus = 'success' | 'warning' | 'error' | 'info';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
    @Input() status: MessageStatus;

    constructor() {}

    ngOnInit() {}
}

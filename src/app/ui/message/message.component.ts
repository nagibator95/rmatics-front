import {Component, OnInit, ChangeDetectionStrategy, Input} from '@angular/core';
import {AlertService} from '../../shared/services/alert.service';

type MessageStatus = 'success' | 'warning' | 'error' | 'info';

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MessageComponent implements OnInit {
    @Input() status: MessageStatus;
    @Input() text: string;

    constructor(private alertService: AlertService) {}

    ngOnInit() {}

    onCloseClicked() {
        this.alertService.destroy();
    }
}

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

export interface IRadioButton {
    id?: string;
    text: string;
    href?: string;
    onClickHandler?: () => void;
}

@Component({
    selector: 'app-radio-group',
    templateUrl: './radio-group.component.html',
    styleUrls: ['./radio-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupComponent implements OnInit {
    @Input() radioButtons: IRadioButton[] = [];

    constructor() {}

    ngOnInit() {
        if (!!this.radioButtons.length && this.radioButtons[0].onClickHandler) {
            this.radioButtons[0].onClickHandler();
        }
    }
}

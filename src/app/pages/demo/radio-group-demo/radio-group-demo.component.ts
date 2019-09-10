import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';

import {IRadioButton} from '../../../ui/radio-group/radio-group.component';

@Component({
    selector: 'app-radio-group-demo',
    templateUrl: './radio-group-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupDemoComponent implements OnInit {
    radioButtons: IRadioButton[] = [
        {
            id: 'radio1',
            text: 'Radio 1',
            onClickHandler: () => {},
        },
        {
            id: 'radio2',
            text: 'Radio 2',
            onClickHandler: () => {},
        },
        {
            id: 'radio3',
            text: 'Radio 3',
            onClickHandler: () => {},
        },
    ];

    constructor() {}

    ngOnInit() {}
}

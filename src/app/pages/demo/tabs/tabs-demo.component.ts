import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-tabs-demo',
    templateUrl: './tabs-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
    tabs = [
        {
            id: 'tab1',
            text: 'ITab 1',
        },
        {
            id: 'tab2',
            text: 'ITab 2',
            current: true,
        },
    ];

    log = () => {};
}

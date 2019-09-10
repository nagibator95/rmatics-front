import {ChangeDetectionStrategy, Component} from '@angular/core';

import {languages} from '../../../shared/constants';

@Component({
    selector: 'app-select-demo',
    templateUrl: './select-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectDemoComponent {
    items = languages;
    value = '';
}

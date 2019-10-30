import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {ITest} from '../../../../core/stores/contest/types/contest.types';

@Component({
    selector: 'app-tests',
    templateUrl: './tests.component.html',
    styleUrls: ['./tests.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsComponent {
    @Input() tests: ITest[] = [];
}

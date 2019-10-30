import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

import {PackageStatus} from '../../../core/stores/contest/types/contest.types';

@Component({
    selector: 'app-package-status',
    templateUrl: './package-status.component.html',
    styleUrls: ['./package-status.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        '[class._green]': `classColor === '_green'`,
        '[class._yellow]': `classColor === '_yellow'`,
        '[class._red]': `classColor === '_red'`,
    },
})
export class PackageStatusComponent {
    @Input() status!: PackageStatus;

    get classColor() {
        switch (this.status.toUpperCase()) {
            case 'OK':
            case 'AC':
                return '_green';
            case 'PD':
            case 'RU':
            case 'CG':
            case 'AW':
                return '_yellow';
            default:
                return '_red';
        }
    }
}

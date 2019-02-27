import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

export type PackageStatus =
  'OK' |
  'RJ' |
  'AC' |
  'SV' |
  'IG' |
  'CE' |
  'DQ' |
  'PT' |
  'PD' |
  'RT' |
  'TL' |
  'PE' |
  'WA' |
  'CF' |
  'ML' |
  'SE' |
  'RU' |
  'CG' |
  'AW';

@Component({
  selector: 'app-package-status',
  templateUrl: './package-status.component.html',
  styleUrls: ['./package-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classColor',
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

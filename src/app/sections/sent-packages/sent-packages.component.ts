import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PackageStatus } from './package-status/package-status.component';

interface Package {
  id: number;
  date: string;
  lang: string;
  tests: number;
  score: number;
  href: string;
  status: PackageStatus;
}

@Component({
  selector: 'app-sent-packages',
  templateUrl: './sent-packages.component.html',
  styleUrls: ['./sent-packages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentPackagesComponent {
  packages: Package[] = [
    {
      id: 6,
      date: '10 декабря',
      lang: 'Python 3.4.3',
      tests: 2,
      score: 20,
      href: '',
      status: 'RJ',
    },
    {
      id: 5,
      date: '9 декабря',
      lang: 'Python 3.4.3',
      tests: 5,
      score: 50,
      href: '',
      status: 'OK',
    },
    {
      id: 4,
      date: '9 декабря',
      lang: 'Python 3.4.3',
      tests: 1,
      score: 10,
      href: '',
      status: 'RJ',
    },
  ];
}

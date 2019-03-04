import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Test } from '../../contest.types';

@Component({
  selector: 'app-tests',
  templateUrl: './tests.component.html',
  styleUrls: ['./tests.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestsComponent {
  @Input() tests: Test[] = [];
}

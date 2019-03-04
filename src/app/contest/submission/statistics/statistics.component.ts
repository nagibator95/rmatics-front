import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Statistics } from '../../contest.types';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatisticsComponent {
  @Input() statistics: Statistics[] = [];
}

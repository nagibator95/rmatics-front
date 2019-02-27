import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Conditions, Restrictions, TaskMainService } from './task-main.service';

@Component({
  selector: 'app-task-main',
  templateUrl: './task-main.component.html',
  styleUrls: ['./task-main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMainComponent {
  restrictions!: Restrictions;
  conditions!: Conditions;

  constructor(data: TaskMainService) {
    const { restrictions, conditions } = data.getData();

    this.restrictions = restrictions;
    this.conditions = conditions;
  }

  get minDataLines() {
    return Math.max(this.conditions.dataExamples.input.length, this.conditions.dataExamples.output.length);
  }
}

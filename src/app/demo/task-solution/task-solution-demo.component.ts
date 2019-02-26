import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-solution-demo',
  templateUrl: './task-solution-demo.component.html',
  styleUrls: ['./task-solution-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TaskSolutionDemoComponent {
}

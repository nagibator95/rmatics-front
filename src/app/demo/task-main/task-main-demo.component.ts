import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-main-demo',
  templateUrl: './task-main-demo.component.html',
  styleUrls: ['./task-main-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMainDemoComponent {
}

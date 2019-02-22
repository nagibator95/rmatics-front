import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-task-menu-demo',
  templateUrl: './task-menu-demo.component.html',
  styleUrls: ['./task-menu-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMenuDemoComponent {
}

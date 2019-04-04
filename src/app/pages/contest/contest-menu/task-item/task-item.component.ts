import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskItemComponent {
  @Input() letter!: string;
  @Input() href: string | null = null;
  @HostBinding('class._current') @Input() current = false;
  @HostBinding('class._collapsed') @Input() collapsed = false;
}

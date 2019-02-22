import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';

interface Task {
  letter: string;
  text: string;
  href: string;
  current?: boolean;
}

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskMenuComponent {
  @HostBinding('class._collapsed') @Input() collapsed = false;
  @Input() meetingText!: string;
  @Input() meetingLink!: string;
  @Input() contest!: string;
  @Input() timer!: string;
  @Input() tasks!: Task[];

  toggleMenu = () => this.collapsed = !this.collapsed;

}

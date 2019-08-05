import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
} from '@angular/core';
import {Store} from '@ngrx/store';

import {RouterActions} from '../../../core/stores/router';
import {WorkshopService} from '../../monitor/workshop/workshop.service';

interface Task {
  letter: string;
  text: string;
  href: string;
  id: number;
  rank?: number;
}

@Component({
  selector: 'app-contest-menu',
  templateUrl: './contest-menu.component.html',
  styleUrls: ['./contest-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestMenuComponent {
  @HostBinding('class._collapsed') @Input() collapsed = false;
  @Input() meetingText!: string;
  @Input() meetingLink!: string;
  @Input() contest!: string;
  @Input() timer!: string;
  @Input() tasks!: Task[];
  @Input() currentTaskId = 1;
  workshop = this.workshopService.workshop;

  constructor(private workshopService: WorkshopService, private store$: Store<any>) {}

  toggleMenu = () => this.collapsed = !this.collapsed;

  onWorkshopTitleClicked(workshopId: number) {
    this.navigate(workshopId, 'content');
  }

  onResultsClicked(workshopId: number) {
    this.navigate(workshopId, 'results');
  }

  private navigate(workshopId: number, tabName: string) {
    this.store$.dispatch(new RouterActions.Go({path: [`workshop/${workshopId}/${tabName}`]}));
  }
}

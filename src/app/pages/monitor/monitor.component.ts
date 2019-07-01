import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import { Tab } from 'src/app/ui/tabs/tabs.component';

import {RouterActions} from '../../core/stores/router';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorComponent implements OnInit {
  workshopId: number;
  activeTab = 'results';
  tabs: Tab[] = [
    {
      text: 'Содержание',
      id: 'content',
    },
    {
      text: 'Результаты',
      id: 'results',
      current: true,
    },
  ];

  constructor(private route: ActivatedRoute, private store$: Store<any>) {}

  ngOnInit() {
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
  }

  onTabClick(id: string) {
    this.activeTab = id;
    this.store$.dispatch(new RouterActions.Go({path: [`workshop/${this.workshopId}/${id}`]}));
  }
}

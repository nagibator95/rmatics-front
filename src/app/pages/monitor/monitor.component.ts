import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import { Tab } from 'src/app/ui/tabs/tabs.component';

import {RouterActions} from '../../core/stores/router';

import {WorkshopService} from './workshop/workshop.service';

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
      current: true,
    },
    {
      text: 'Результаты',
      id: 'results',
    },
  ];
  workshop = this.workshopService.workshop;

  constructor(private route: ActivatedRoute, private store$: Store<any>, private workshopService: WorkshopService) {}

  ngOnInit() {
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.workshop.subscribe(value => console.log(value));
  }

  onTabClick(id: string) {
    this.activeTab = id;
    this.store$.dispatch(new RouterActions.Go({path: [`workshop/${this.workshopId}/${id}`]}));
  }
}

import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
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
export class MonitorComponent implements OnInit, OnDestroy {
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
    },
  ];
  workshop = this.workshopService.workshop;
  joinMessage = this.workshopService.joinMessage;

  constructor(private route: ActivatedRoute, private store$: Store<any>, private workshopService: WorkshopService, private router: Router) {}

  ngOnInit() {
    this.workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.activeTab = this.router.url.includes('content') ? 'content' : 'results';
    this.initTabs();
    this.workshop.subscribe(value => console.log(value));
  }

  ngOnDestroy() {
    this.workshopService.joinMessage.next('');
  }

  onTabClick(id: string) {
    this.activeTab = id;
    this.store$.dispatch(new RouterActions.Go({path: [`workshop/${this.workshopId}/${id}`]}));
  }

  initTabs() {
    this.tabs[0].current = this.activeTab === 'content';
    this.tabs[1].current = this.activeTab === 'results';
  }
}

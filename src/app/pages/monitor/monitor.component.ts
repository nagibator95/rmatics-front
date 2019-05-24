import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Tab } from 'src/app/ui/tabs/tabs.component';

import { MonitorService } from './monitor.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorComponent implements OnInit {
  monitor = this.monitorService.monitor;

  activeTab = 'result';
  tabs: Tab[] = [
    {
      text: 'Содержание',
      id: 'content',
    },
    {
      text: 'Результаты',
      id: 'result',
      current: true,
    },
  ];

  constructor(
    private monitorService: MonitorService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const workshopId = Number(this.route.snapshot.paramMap.get('workshopId'));
    this.monitorService.getMonitor(workshopId);
  }

  onTabClick(id: string) {
    this.activeTab = id;
  }

}

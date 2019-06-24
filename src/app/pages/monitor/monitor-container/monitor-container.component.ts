import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

import {MonitorService} from './monitor.service';

@Component({
  selector: 'app-monitor-container',
  templateUrl: './monitor-container.component.html',
  styleUrls: ['./monitor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MonitorContainerComponent implements OnInit {
  monitor = this.monitorService.monitor;

  constructor(
    private monitorService: MonitorService,
    private router: Router,
  ) {}

  ngOnInit() {
    const workshopId = Number(this.router.routerState.snapshot.root.children[0].paramMap.get('workshopId'));
    this.monitorService.getMonitor(workshopId);
  }
}

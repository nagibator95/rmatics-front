import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { Tab } from 'src/app/ui/tabs/tabs.component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MonitorComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

  onTabClick(id: string) {
    this.activeTab = id;
  }

}

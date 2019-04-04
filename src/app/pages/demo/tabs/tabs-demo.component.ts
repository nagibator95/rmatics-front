import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tabs-demo',
  templateUrl: './tabs-demo.component.html',
  styleUrls: ['./tabs-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsDemoComponent {
  tabs = [
    {
      id: 'tab1',
      text: 'Tab 1',
    },
    {
      id: 'tab2',
      text: 'Tab 2',
      current: true,
    },
  ];

  log = (data: string) => console.log(data);
}

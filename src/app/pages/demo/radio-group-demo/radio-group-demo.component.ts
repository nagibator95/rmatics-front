import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import {RadioButton} from '../../../ui/radio-group/radio-group.component';

@Component({
  selector: 'app-radio-group-demo',
  templateUrl: './radio-group-demo.component.html',
  styleUrls: ['./radio-group-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioGroupDemoComponent implements OnInit {
  radioButtons: RadioButton[] = [
    {
      id: 'radio1',
      text: 'Radio 1',
      onClickHandler: () => console.log('Radio 1 showing.'),
    },
    {
      id: 'radio2',
      text: 'Radio 2',
      onClickHandler: () => console.log('Radio 2 showing.'),
    },
    {
      id: 'radio3',
      text: 'Radio 3',
      onClickHandler: () => console.log('Radio 3 showing. '),
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}

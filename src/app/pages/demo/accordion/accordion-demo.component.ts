import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-accordion-demo',
  templateUrl: './accordion-demo.component.html',
  styleUrls: ['./accordion-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccordionDemoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

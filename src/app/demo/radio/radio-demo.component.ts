import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-radio-demo',
  templateUrl: './radio-demo.component.html',
  styleUrls: ['./radio-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RadioDemoComponent {}

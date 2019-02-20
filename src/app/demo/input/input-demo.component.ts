import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-demo',
  templateUrl: './input-demo.component.html',
  styleUrls: ['./input-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class InputDemoComponent {}

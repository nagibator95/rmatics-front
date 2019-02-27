import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-sent-packages-demo',
  templateUrl: './sent-packages-demo.component.html',
  styleUrls: ['./sent-packages-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentPackagesDemoComponent {
}

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-upload-demo',
  templateUrl: './upload-demo.component.html',
  styleUrls: ['./upload-demo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class UploadDemoComponent {
}

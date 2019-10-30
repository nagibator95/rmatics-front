import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-upload-demo',
    templateUrl: './upload-demo.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadDemoComponent {}

import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'app-button-demo',
    templateUrl: './button-demo.component.html',
    styleUrls: ['./button-demo.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDemoComponent {}

import {ChangeDetectionStrategy, Component, Input} from '@angular/core';

@Component({
    selector: 'app-icon-label',
    templateUrl: './icon-label.component.html',
    styleUrls: ['./icon-label.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconLabelComponent {
    @Input() caption!: string;
    @Input() icon!: string;
}

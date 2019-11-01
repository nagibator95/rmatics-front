import {
    ChangeDetectionStrategy,
    Component,
    Input,
    ViewEncapsulation,
} from '@angular/core';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class ContentComponent {
    @Input() content = '';
    
    ngAfterContentChecked() { 
        // When task has no content, replace empty string
        // with minimal valid HTML as ng-katex expects valid HTML
        if (this.content === '') {
            this.content = '<div class="problem-statement"></div>';
        }
    }
}

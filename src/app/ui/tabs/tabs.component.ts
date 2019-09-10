import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';

export interface ITab {
    id: string;
    text: string;
    href?: string;
    current?: boolean;
}

@Component({
    selector: 'app-tabs',
    templateUrl: './tabs.component.html',
    styleUrls: ['./tabs.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsComponent {
    @Input() tabs: ITab[] = [];
    @Output() tabClick = new EventEmitter();

    handleTabClick = (tab: ITab) => {
        this.tabs.forEach(element => (element.current = false));
        tab.current = true;
        this.tabClick.emit(tab.id);
    };
}

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SharedModule} from '../../../shared/shared.module';
import {UiModule} from '../../../ui/ui.module';

import {ContestSelectComponent} from './contest-select/contest-select.component';
import {MinuteSecondsPipe} from './minute-seconds.pipe';
import {MonitorContainerComponent} from './monitor-container.component';
import {StatusComponent} from './status/status.component';
import {ScrollableDirective} from './table/scrollable.directive';
import {TableComponent} from './table/table.component';
import {ControlsModule} from '../../../ui/controls/controls.module';

const routes: Routes = [
    {
        path: '',
        component: MonitorContainerComponent,
    },
];

@NgModule({
    declarations: [
        MonitorContainerComponent,
        TableComponent,
        ScrollableDirective,
        StatusComponent,
        MinuteSecondsPipe,
        ContestSelectComponent,
    ],
    imports: [
        CommonModule,
        SharedModule,
        UiModule,
        ControlsModule,
        RouterModule.forChild(routes),
    ],
    exports: [MonitorContainerComponent],
})
export class MonitorContainerModule {}

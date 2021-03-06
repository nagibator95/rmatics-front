import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {CodemirrorModule} from '@ctrl/ngx-codemirror';
import {KatexModule} from 'ng-katex';

import {SharedModule} from '../../shared/shared.module';
import {ControlsModule} from '../../ui/controls/controls.module';
import {UiModule} from '../../ui/ui.module';

import {AnotherContestResolverService} from './another-contest-resolver.service';
import {CodeBlockComponent} from './code-block/code-block.component';
import {ContestGuardService} from './contest-guard.service';
import {ContestMenuComponent} from './contest-menu/contest-menu.component';
import {TaskItemComponent} from './contest-menu/task-item/task-item.component';
import {ContestPaginationComponent} from './contest-pagination/contest-pagination.component';
import {ContestResolverService} from './contest-resolver.service';
import {ContentComponent} from './contest-task/content/content.component';
import {ContestTaskComponent} from './contest-task/contest-task.component';
import {IconLabelComponent} from './contest-task/icon-label/icon-label.component';
import {ContestComponent} from './contest.component';
import {PackageStatusComponent} from './package-status/package-status.component';
import {SentPackagesComponent} from './sent-packages/sent-packages.component';
import {StatisticsParamPipe} from './submission/statistics/statistics-param.pipe';
import {StatisticsComponent} from './submission/statistics/statistics.component';
import {SubmissionComponent} from './submission/submission.component';
import {TestsParamPipe} from './submission/tests/tests-param.pipe';
import {TestsComponent} from './submission/tests/tests.component';
import {TaskSolutionComponent} from './task-solution/task-solution.component';

const routes: Routes = [
    {
        path: '',
        component: ContestComponent,
    },
    {
        path: ':contestId',
        component: ContestComponent,
        resolve: {message: ContestResolverService},
    },
    {
        path: ':contestId/problem/:problemId',
        component: ContestComponent,
        resolve: {newMessage: AnotherContestResolverService},
    },
];

@NgModule({
    declarations: [
        ContestComponent,
        ContestTaskComponent,
        ContestMenuComponent,
        SentPackagesComponent,
        TaskSolutionComponent,
        TaskItemComponent,
        CodeBlockComponent,
        IconLabelComponent,
        ContestPaginationComponent,
        PackageStatusComponent,
        ContentComponent,
        SubmissionComponent,
        StatisticsComponent,
        TestsComponent,
        StatisticsParamPipe,
        TestsParamPipe,
    ],
    imports: [
        CodemirrorModule,
        CommonModule,
        RouterModule,
        FormsModule,
        ControlsModule,
        SharedModule,
        RouterModule.forChild(routes),
        UiModule,
        KatexModule,
    ],
    exports: [ContestComponent],
    entryComponents: [SubmissionComponent],
    providers: [
        ContestGuardService,
        AnotherContestResolverService,
        ContestResolverService,
    ],
})
export class ContestModule {}

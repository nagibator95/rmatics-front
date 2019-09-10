import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {getDate} from 'src/app/utils/getDate';

import {ContestSelectors} from '../../../core/stores/contest';
import {SubmissionService} from '../../../core/stores/contest/services/submission.service';
import {
    IProblem,
    IRunComment,
    IRunProtocol,
    IRunSource,
    ISubmission,
} from '../../../core/stores/contest/types/contest.types';
import {ModalContent} from '../../../modal/modal-content';
import {ITab} from '../../../ui/tabs/tabs.component';

interface ISubmissionComponentInput {
    submissionService: SubmissionService;
}

@Component({
    selector: 'app-submission',
    templateUrl: './submission.component.html',
    styleUrls: ['./submission.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<ISubmissionComponentInput>
    implements OnInit, OnDestroy {
    protocol: Observable<IRunProtocol>;
    source: Observable<IRunSource>;
    problem: Observable<IProblem>;
    comments: Observable<IRunComment[]>;
    submissionPreview: Observable<ISubmission>;

    isSubmissionsFetching: Observable<boolean>;
    isProtocolFetching: Observable<boolean>;
    isSourceFetching: Observable<boolean>;
    areCommentsFetching: Observable<boolean>;

    getDate = getDate;

    activeTab = 'submission_code';
    tabs: ITab[] = [
        {
            text: 'Код посылки',
            id: 'submission_code',
            current: true,
        },
    ];
    private readonly destroy$ = new Subject();

    constructor(private store$: Store<any>, private cd: ChangeDetectorRef) {
        super();
    }

    ngOnInit() {
        this.protocol = this.store$.pipe(
            select(ContestSelectors.getProtocol()),
            takeUntil(this.destroy$),
        );
        this.source = this.store$.pipe(
            select(ContestSelectors.getSource()),
            takeUntil(this.destroy$),
        );
        this.comments = this.store$.pipe(
            select(ContestSelectors.getComments()),
            takeUntil(this.destroy$),
        );
        this.problem = this.store$.pipe(
            select(ContestSelectors.getProblem()),
            takeUntil(this.destroy$),
        );
        this.submissionPreview = this.store$.pipe(
            select(ContestSelectors.getSubmissionPreview()),
            takeUntil(this.destroy$),
        );
        this.isSubmissionsFetching = this.store$.pipe(
            select(ContestSelectors.getIsSubmissionFetching()),
            takeUntil(this.destroy$),
        );
        this.isProtocolFetching = this.store$.pipe(
            select(ContestSelectors.getIsProtocolFetching()),
            takeUntil(this.destroy$),
        );
        this.isSourceFetching = this.store$.pipe(
            select(ContestSelectors.getIsSourceFetching()),
            takeUntil(this.destroy$),
        );
        this.areCommentsFetching = this.store$.pipe(
            select(ContestSelectors.getAreCommentsFetching()),
            takeUntil(this.destroy$),
        );

        this.protocol.subscribe((value: IRunProtocol | undefined) => {
            if (value) {
                this.tabs = [
                    {
                        text: 'Код посылки',
                        id: 'submission_code',
                        current: true,
                    },
                    {
                        text: 'Протокол',
                        id: 'protocol',
                        current: false,
                    },
                ];

                this.cd.markForCheck();
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onTabClick(event: string) {
        this.activeTab = event;
    }
}

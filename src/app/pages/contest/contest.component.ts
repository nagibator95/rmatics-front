import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    Input,
    OnDestroy,
    OnInit,
    ViewChild,
} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import moment from 'moment';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {CONTEST_TIME_FINISHED} from '../../core/constants/contestInfo';
import {ContestActions, ContestSelectors} from '../../core/stores/contest';
import {IContestData} from '../../core/stores/contest/models/models';
import {
    IContest,
    IContestProblem,
    IShowSubmission,
    IProblem,
    ISubmission,
} from '../../core/stores/contest/types/contest.types';
import {ILanguage} from '../../shared/constants';
import {WorkshopService} from '../monitor/workshop/workshop.service';
import {ContestTaskComponent} from './contest-task/contest-task.component';
import {MessageResolverService} from './message-resolver.service';

@Component({
    selector: 'app-contest',
    templateUrl: './contest.component.html',
    styleUrls: ['./contest.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContestComponent implements OnInit, OnDestroy {
    @ViewChild('task') task!: ContestTaskComponent;
    @Input() courseId = Number(this.route.snapshot.paramMap.get('contestId'));
    problem: Observable<IProblem>;
    contest: Observable<IContest>;
    contestData: Observable<IContestData>;
    submissions: Observable<ISubmission[]>;
    isFetching: Observable<boolean>;
    isSubmissionsFetching: Observable<boolean>;
    fileError: Observable<string>;
    routeChangeSubscription: Subscription;
    uploadRemoveSubscription: Subscription;

    workshop = this.workshopService.workshop;
    isTimerInitiated = false;
    timer = '';
    interval: any = null;
    currentTaskId = 0;
    selectedLanguage: ILanguage = null;
    private readonly destroy$ = new Subject();

    constructor(
        private route: ActivatedRoute,
        private cd: ChangeDetectorRef,
        private store$: Store<any>,
        private workshopService: WorkshopService,
        private message: MessageResolverService,
    ) {}

    private static prepareDuration(
        isVirtual: boolean,
        createdAt: string,
        virtualDurationSeconds: number,
        timestop: string,
    ): number {
        if (isVirtual) {
            const date = new Date(createdAt);

            date.setSeconds(date.getSeconds() + virtualDurationSeconds);

            if (!timestop) {
                return moment(date).diff(new Date()) / 1000;
            } else {
                const timeStopDuration =
                    moment(new Date(timestop)).diff(new Date()) / 1000;
                const virtualDuration = moment(date).diff(new Date()) / 1000;

                return timeStopDuration < virtualDuration
                    ? timeStopDuration
                    : virtualDuration;
            }
        } else {
            return !timestop ? 0 : moment(new Date(timestop)).diff(new Date()) / 1000;
        }
    }

    ngOnInit() {
        this.problem = this.store$.pipe(
            select(ContestSelectors.getProblem()),
            takeUntil(this.destroy$),
        );
        this.contest = this.store$.pipe(
            select(ContestSelectors.getContest()),
            takeUntil(this.destroy$),
        );
        this.contestData = this.store$.pipe(
            select(ContestSelectors.getContestData()),
            takeUntil(this.destroy$),
        );
        this.submissions = this.store$.pipe(
            select(ContestSelectors.getSubmissions()),
            takeUntil(this.destroy$),
        );
        this.isFetching = this.store$.pipe(
            select(ContestSelectors.getIsFetching()),
            takeUntil(this.destroy$),
        );
        this.isSubmissionsFetching = this.store$.pipe(
            select(ContestSelectors.getIsSubmissionFetching()),
            takeUntil(this.destroy$),
        );
        this.fileError = this.store$.pipe(
            select(ContestSelectors.getFileError()),
            takeUntil(this.destroy$),
        );

        this.routeChangeSubscription = this.route.url.subscribe(() => {
            const taskId = Number(this.route.snapshot.paramMap.get('problemId'));

            if (!isNaN(taskId) && Boolean(taskId)) {
                this.store$.dispatch(
                    new ContestActions.GetProblem(taskId, this.courseId),
                );
                this.store$.dispatch(
                    new ContestActions.GetSubmissions(taskId, 1, this.courseId),
                );
                this.currentTaskId = taskId;
            }
        });

        this.uploadRemoveSubscription = this.submissions.subscribe(submissions => {
            if (submissions.length === 0 && this.task !== undefined) {
                this.task.upload.remove();
            }
        });

        this.contestData.subscribe(data => {
            if (data && !this.isTimerInitiated) {
                this.workshopService.getWorkshop(data.workshopId);
                this.isTimerInitiated = true;
                this.interval = this.startTimer(
                    ContestComponent.prepareDuration(
                        data.isVirtual,
                        data.createdAt,
                        data.virtualDuration,
                        data.timeStop,
                    ),
                );
            }
        });
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
        this.routeChangeSubscription.unsubscribe();
        this.store$.dispatch(new ContestActions.SetContest(null));
        localStorage.removeItem('code');
        this.finishTimer(this.interval);
        this.message.isNavigated = false;
    }

    onSelectedLanguageChanged(lang: ILanguage) {
        this.selectedLanguage = lang;
    }

    addSubmission(data: {file: File; languageId: number}) {
        this.store$.dispatch(
            new ContestActions.AddSubmission(
                this.currentTaskId,
                data.file,
                data.languageId,
                this.courseId,
            ),
        );
    }

    openSubmission(value: IShowSubmission) {
        this.store$.dispatch(new ContestActions.ShowSubmission(value));
    }

    getSubmissions(page: number) {
        this.store$.dispatch(
            new ContestActions.GetSubmissions(this.currentTaskId, page, this.courseId),
        );
    }

    selectFile() {
        this.store$.dispatch(new ContestActions.ClearFileError());
    }

    compare(problem1: IContestProblem, problem2: IContestProblem): number {
        return problem1.rank - problem2.rank;
    }

    private startTimer(duration: number): any {
        let timer = duration;

        if (timer <= 0) {
            this.finishTimer(null);

            return null;
        }

        this.tick(timer--);

        const run = () => {
            this.tick(timer);

            if (timer - 1 < 0) {
                this.finishTimer(interval);
            } else {
                timer--;
            }

            setTimeout(run, 1000);
        };

        const interval = setTimeout(run, 1000);

        return interval;
    }

    private tick(duration: number) {
        const minutes = parseInt(String((duration / 60) % 60), 10);
        const seconds = parseInt(String(duration % 60), 10);
        const hours = parseInt(String(duration / 3600), 10);

        this.timer =
            (hours < 10 ? '0' + hours : hours) +
            ':' +
            (minutes < 10 ? '0' + minutes : minutes) +
            ':' +
            (seconds < 10 ? '0' + seconds : seconds);
        this.cd.markForCheck();
    }

    private finishTimer(interval: any) {
        clearTimeout(interval);
        this.timer = CONTEST_TIME_FINISHED;
    }
}

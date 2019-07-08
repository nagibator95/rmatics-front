import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {select, Store} from '@ngrx/store';
import moment from 'moment';
import {Observable, Subject, Subscription} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {ContestActions, ContestSelectors} from '../../core/stores/contest';
import {ContestData} from '../../core/stores/contest/models/models';
import {Contest, IShowSubmission, Problem, Submission} from '../../core/stores/contest/types/contest.types';

import { ContestTaskComponent } from './contest-task/contest-task.component';

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestComponent implements OnInit, OnDestroy {
  @ViewChild('task') task!: ContestTaskComponent;
  @Input() courseId = Number(this.route.snapshot.paramMap.get('contestId'));
  problem: Observable<Problem>;
  contest: Observable<Contest>;
  contestData: Observable<ContestData>;
  submissions: Observable<Submission[]>;
  isFetching: Observable<boolean>;
  isSubmissionsFetching: Observable<boolean>;
  fileError: Observable<string>;
  routeChangeSubscription: Subscription;
  uploadRemoveSubscription: Subscription;

  timer = '';
  interval: any = null;
  currentTaskId = 0;
  private readonly destroy$ = new Subject();

  constructor(
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef,
    private store$: Store<any>) {}

  private static prepareDuration(isVirtual: boolean, createdAt: string, virtualDurationSeconds: number, timestop: string) {
    if (isVirtual) {
      const date = new Date(createdAt);
      date.setSeconds(date.getSeconds() + virtualDurationSeconds);
      if (!timestop) {
        return moment(date).diff((new Date())) / 1000;
      } else {
        const timeStopDuration = moment(new Date(timestop)).diff((new Date())) / 1000;
        const virtualDuration = moment(date).diff((new Date())) / 1000;
        return timeStopDuration < virtualDuration ? timeStopDuration : virtualDuration;
      }
    } else {
      return !timestop ? 0 : moment(new Date(timestop)).diff((new Date())) / 1000;
    }
  }

  ngOnInit() {
    localStorage.setItem('code', JSON.stringify({}));
    this.problem = this.store$.pipe(select(ContestSelectors.getProblem()), takeUntil(this.destroy$));
    this.contest = this.store$.pipe(select(ContestSelectors.getContest()), takeUntil(this.destroy$));
    this.contestData = this.store$.pipe(select(ContestSelectors.getContestData()), takeUntil(this.destroy$));
    this.submissions = this.store$.pipe(select(ContestSelectors.getSubmissions()), takeUntil(this.destroy$));
    this.isFetching = this.store$.pipe(select(ContestSelectors.getIsFetching()), takeUntil(this.destroy$));
    this.isSubmissionsFetching = this.store$.pipe(select(ContestSelectors.getIsSubmissionFetching()), takeUntil(this.destroy$));
    this.fileError = this.store$.pipe(select(ContestSelectors.getFileError()), takeUntil(this.destroy$));

    this.routeChangeSubscription = this.route.url.subscribe(() => {
      const taskId = Number(this.route.snapshot.paramMap.get('problemId'));

      if (!isNaN(taskId) && Boolean(taskId)) {
        this.store$.dispatch(new ContestActions.GetProblem(taskId, this.courseId));
        this.store$.dispatch(new ContestActions.GetSubmissions(taskId, 1, this.courseId));
        this.currentTaskId = taskId;
      }
    });

    this.uploadRemoveSubscription = this.submissions.subscribe(submissions => {
      if (submissions.length === 0 && this.task !== undefined) {
        this.task.upload.remove();
      }
    });

    this.contestData.subscribe(data => {
      this.interval = this.startTimer(ContestComponent.prepareDuration(data.isVirtual, data.createdAt, data.virtualDuration, data.timeStop));
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.routeChangeSubscription.unsubscribe();
    this.store$.dispatch(new ContestActions.SetContest(null));
    localStorage.removeItem('code');
    this.finishTimer(this.interval);
  }

  addSubmission(data: { file: File, languageId: number }) {
    this.store$.dispatch(new ContestActions.AddSubmission(this.currentTaskId, data.file, data.languageId, this.courseId));
  }

  openSubmission(value: IShowSubmission) {
    this.store$.dispatch(new ContestActions.ShowSubmission(value));
  }

  getSubmissions(page: number) {
    this.store$.dispatch(new ContestActions.GetSubmissions(this.currentTaskId, page, this.courseId));
  }

  selectFile() {
    this.store$.dispatch(new ContestActions.ClearFileError());
  }

  private startTimer(duration: number) {
    let timer = duration;
    this.tick(timer--);

    const interval = setInterval(() => {
      this.tick(timer);

      if (timer - 1 < 0) {
        this.finishTimer(interval);
      } else {
        timer--;
      }
    }, 1000);

    return interval;
  }

  private tick(duration: number) {
    const minutes = parseInt(String((duration / 60) % 60), 10);
    const seconds = parseInt(String(duration % 60), 10);
    const hours = parseInt(String(duration / 3600), 10);

    this.timer = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
    this.cd.markForCheck();
  }

  private finishTimer(interval: any) {
    clearInterval(interval);
    this.timer = '';
  }
}

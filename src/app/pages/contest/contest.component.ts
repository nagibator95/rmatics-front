import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';

import { ContestTaskComponent } from './contest-task/contest-task.component';
import { ContestService } from './contest.service';
import { Contest, ContestProblem } from './contest.types';
import { SubmissionService } from './submission.service';

export const defaultCourseId = 1;

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestComponent implements OnInit, OnDestroy {
  @ViewChild('task') task!: ContestTaskComponent;
  @Input() courseId = this.route.snapshot.paramMap.get('id');
  problem = this.contestService.problem;
  contest = this.contestService.contest;
  submissions = this.contestService.submissions;
  isFetching = this.contestService.isFetching;
  isSubmissionsFetching = this.contestService.isSubmissionsFetching;
  fileError = this.contestService.fileError;
  uploadRemoveSubscription = this.submissions.subscribe(submissions => {
    console.log(submissions);

    if (submissions.length === 0 && this.task !== undefined) {
      this.task.upload.remove();
    }
  });
  paginationItems = this.contestService.contest
    .pipe(map(contest => {
      if (contest !== undefined) {
        const currentIndex = contest.problems.findIndex((item: ContestProblem) => item.id === this.currentTaskId);
        return [contest.problems[currentIndex - 1], contest.problems[currentIndex + 1]];
      }

      return [undefined, undefined];
    }));

  timer = '';
  interval: any = null;
  currentTaskId = 0;
  routeChangeSubscription = this.route.url.subscribe(segments => {
    if (segments.length === 0) {
      return;
    }

    const taskNumber = Number(segments[segments.length - 1].path);
    if (!isNaN(taskNumber) && Boolean(taskNumber)) {
      this.contestService.getProblem(taskNumber, defaultCourseId);
      this.contestService.getSubmissions(taskNumber, 1, defaultCourseId);
      this.currentTaskId = taskNumber;
    }

    this.interval = this.startTimer(Number(this.route.snapshot.paramMap.get('duration')));
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private submissionService: SubmissionService,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit() {
    console.log('onInit');
    if (this.route.snapshot.paramMap.get('id')) {
      this.contestService.getContest(Number(this.route.snapshot.paramMap.get('id')));
    }
    setTimeout(() => {
      this.contest
        .pipe(filter(Boolean), take(1))
        .subscribe(contest => {
          const problems = (contest as Contest).problems;
          console.log(contest);
          if (!this.currentTaskId && problems.length > 0) {
            this.router.navigate(['contest', this.courseId, 'problem', problems[0].id, {duration: Number(this.route.snapshot.paramMap.get('duration'))}]);
          }
        });
    }, 1000);
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
    this.uploadRemoveSubscription.unsubscribe();
    this.finishTimer(this.interval);
  }

  addSubmission(data: { file: File, languageId: number }) {
    this.contestService.addSubmission(this.currentTaskId, data.file, data.languageId, defaultCourseId);
  }

  openSubmission(id: number) {
    this.submissionService.showSubmission(id);
  }

  getSubmissions(page: number) {
    this.contestService.getSubmissions(this.currentTaskId, page, defaultCourseId);
  }

  selectFile() {
    this.contestService.clearFileError();
  }

  startTimer(duration: number) {
    let timer = duration;
    const interval = setInterval(() => {
      const minutes = parseInt(String((timer / 60) % 60), 10);
      const seconds = parseInt(String(timer % 60), 10);
      const hours = parseInt(String(timer / 3600), 10);

      this.timer = (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
      this.cd.markForCheck();

      if (timer - 1 < 0) {
        this.finishTimer(interval);
      } else {
        timer--;
      }
    }, 1000);

    return interval;
  }

  finishTimer(interval: any) {
    clearInterval(interval);
    this.timer = '';
  }
}

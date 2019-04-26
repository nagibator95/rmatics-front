import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
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
  @Input() courseId = defaultCourseId;
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
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private contestService: ContestService,
    private submissionService: SubmissionService) {
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

  ngOnInit() {
    this.contestService.getContest(this.courseId);
    this.contest
      .pipe(filter(Boolean), take(1))
      .subscribe(contest => {
        const problems = (contest as Contest).problems;
        if (!this.currentTaskId && problems.length > 0) {
          this.router.navigate(['contest', this.courseId, 'problem', problems[0].id]);
        }
      });
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
    this.uploadRemoveSubscription.unsubscribe();
  }
}

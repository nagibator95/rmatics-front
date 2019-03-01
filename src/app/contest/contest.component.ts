import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from '../api/auth.service';

import { ContestService } from './contest.service';

const defaultContestId = 1;
const defaultProblemId = 1;

@Component({
  selector: 'app-contest',
  templateUrl: './contest.component.html',
  styleUrls: ['./contest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ContestComponent implements OnInit, OnDestroy {
  problem = this.contestService.problem;
  contest = this.contestService.contest;
  submissions = this.contestService.submissions;
  currentTaskId = 1;
  routeChangeSubscription = this.route.url.subscribe(segments => {
    const taskNumber = Number(segments[segments.length - 1].path);
    if (!isNaN(taskNumber)) {
      this.contestService.getProblem(taskNumber);
      this.currentTaskId = taskNumber;
    }
  });

  constructor(
    private route: ActivatedRoute,
    private auth: AuthService,
    private contestService: ContestService,
  ) {
  }

  addSubmission(data: { code: string, languageId: number }) {
    this.contestService.addSubmission(this.currentTaskId, data.code, data.languageId);
  }

  getSubmissions() {
    this.contestService.getSubmissions(this.currentTaskId);
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
    this.contestService.getContest(defaultContestId);
    this.contestService.getProblem(defaultProblemId);
  }

  ngOnDestroy() {
    this.routeChangeSubscription.unsubscribe();
  }
}

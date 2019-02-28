import { languages } from 'src/app/shared/constants';
import { getDate } from 'src/app/utils/getDate';

import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { SubmissionApi } from '../task-main/task-main.fetcher';
import { TaskMainService } from '../task-main/task-main.service';

import { PackageStatus } from './package-status/package-status.component';

type sortFields = 'date' | 'score';

interface Submission {
  id: number;
  date: number;
  lang: string;
  tests: number;
  score: number;
  href: string;
  status: PackageStatus;
}

interface LastSorted {
  field: sortFields;
  reverse: boolean;
}

const formatSubmissions = (submission: SubmissionApi): Submission => {
  const lang = languages.find(language => language.id === submission.ejudge_language_id);
  return {
    id: submission.id,
    date: submission.create_time,
    lang: lang ? lang.title : '',
    tests: submission.ejudge_test_num,
    score: submission.ejudge_score,
    href: '',
    status: submission.ejudge_status as PackageStatus,
  };
};

@Component({
  selector: 'app-sent-packages',
  templateUrl: './sent-packages.component.html',
  styleUrls: ['./sent-packages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SentPackagesComponent implements OnInit {
  @Input() problemId!: number;
  submissions: Submission[] = [];
  getDate = getDate;

  lastSorted: LastSorted = { field: 'date', reverse: false };

  private submissionsLength = 3;
  restSubmissions = 0;

  constructor(private taskMainService: TaskMainService) {
  }

  ngOnInit() {
    this.updateSubmissions();
  }

  get moreNumber() {
    if (this.restSubmissions > 5) {
      return 5;
    }
    return this.restSubmissions;
  }

  get sortedDate() {
    return this.lastSorted.field === 'date' && this.lastSorted.reverse;
  }

  get sortedScore() {
    return this.lastSorted.field === 'score' && this.lastSorted.reverse;
  }

  updateSubmissions(more = 0) {
    const submissionsLengthNew = this.submissionsLength + more;
    const res = this.taskMainService.getSubmissions(this.problemId, submissionsLengthNew);

    this.submissionsLength = submissionsLengthNew;
    this.submissions = res.data.map(formatSubmissions).sort(this.compare(this.lastSorted.field, this.lastSorted.reverse));
    this.restSubmissions = res.rest;
  }

  compare = (field: sortFields, reverse = false) => (a: Submission, b: Submission): number => {
    this.lastSorted = { field, reverse };

    const diff = a[field] - b[field];

    if (diff === 0) {
      return (reverse ? 1 : -1) * a.id - b.id;
    }
    return (reverse ? 1 : -1) * diff;
  }

  handleUpdate = (more?: number) => this.updateSubmissions(more);

  handleSort = (field: sortFields) => {
    const reverse = this.lastSorted.field === field ? !this.lastSorted.reverse : false;
    this.lastSorted = { field, reverse };
    this.submissions = this.submissions.sort(this.compare(field, reverse));
  }
}

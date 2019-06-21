import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import dayjs from 'dayjs';
import { getDate } from 'src/app/utils/getDate';

import { Submission } from '../../../core/stores/contest/types/contest.types';

type sortFields = 'date' | 'score';

interface LastSorted {
  field: sortFields;
  reverse: boolean;
}

const convert = (field: sortFields, val: Submission): number => field === 'date' ? dayjs(val[field]).valueOf() : val[field];

@Component({
  selector: 'app-sent-packages',
  templateUrl: './sent-packages.component.html',
  styleUrls: ['./sent-packages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SentPackagesComponent {
  private _submisions: Submission[] = [];
  get submissions(): Submission[]  {
    return this._submisions;
  }

  @Input('submissions')
  set submissions(value: Submission[] ) {
    this.isSubmissionsListFull = value.length % 5 !== 0;
    this._submisions = value.sort(this.compare(this.lastSorted.field, this.lastSorted.reverse));
  }
  @Input() isFetching = false;
  @Input() problemId!: number;
  @Output() updateSubmissions = new EventEmitter<number>();
  @Output() openSubmission = new EventEmitter<number>();

  getDate = getDate;
  lastSorted: LastSorted = { field: 'date', reverse: false };
  page = 1;
  isSubmissionsListFull = false;

  constructor() {}

  get sortedDate() {
    return this.lastSorted.field === 'date' && this.lastSorted.reverse;
  }

  get sortedScore() {
    return this.lastSorted.field === 'score' && this.lastSorted.reverse;
  }

  compare = (field: sortFields, reverse = false) => (a: Submission, b: Submission): number => {
    this.lastSorted = { field, reverse };

    const val1 = convert(field, a);
    const val2 = convert(field, b);

    const diff = val1 - val2;

    if (diff === 0) {
      return (reverse ? 1 : -1) * a.id - b.id;
    }
    return (reverse ? 1 : -1) * diff;
  }

  update() {
    this.updateSubmissions.emit(this.page);
  }

  checkForUpdates() {
    this.updateSubmissions.emit(1);
    this.page = 1;
  }

  changePageSize() {
    this.page = this.page + 1;
    this.update();
  }

  handleSort = (field: sortFields) => {
    const reverse = this.lastSorted.field === field ? !this.lastSorted.reverse : false;
    this.lastSorted = { field, reverse };
    this.submissions = this.submissions.sort(this.compare(field, reverse));
  }
}

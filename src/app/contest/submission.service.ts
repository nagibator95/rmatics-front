import { map } from 'rxjs/operators';

import { Injectable } from '@angular/core';

import { ModalService } from '../modal/modal.service';

import { ContestService } from './contest.service';
import { SubmissionComponent } from './submission/submission.component';

@Injectable({
  providedIn: 'root',
})
export class SubmissionService {
  constructor(
    private contestService: ContestService,
    private modalService: ModalService,
  ) { }

  showSubmission(submissionId: number) {
    const submission = this.contestService.submissions.pipe(map(submissions => submissions.find(val => val.id === submissionId)));

    this.modalService.open({
      component: SubmissionComponent,
      data: { submission, isFetching: this.contestService.isFetching },
    });
  }
}

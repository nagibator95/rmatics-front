import { ModalContent } from 'src/app/modal/modal-content';
import { getDate } from 'src/app/utils/getDate';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SubmissionService } from '../submission.service';

interface SubmissionComponentInput {
  submissionService: SubmissionService;
}

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubmissionComponent extends ModalContent<SubmissionComponentInput> {
  submissionService = this.data.submissionService;
  submission = this.submissionService.submission;
  problem = this.submissionService.problem;
  isFetching = this.submissionService.isFetching;

  getDate = getDate;

  tabs = [
    {
      text: 'Код посылки',
      id: 'submission_code',
      current: true,
    }, {
      text: 'Протокол',
      id: 'protocol',
      current: false,
    },
  ];

  activeTab: string = this.tabs[0].id;
}

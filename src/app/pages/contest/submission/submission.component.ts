import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ModalContent } from 'src/app/modal/modal-content';
import { getDate } from 'src/app/utils/getDate';

import { RunProtocol } from '../contest.types';
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
  submissionPreview = this.submissionService.submissionPreview;
  protocol = this.submissionService.protocol;
  source = this.submissionService.source;
  problem = this.submissionService.problem;

  isSubmissionsFetching = this.submissionService.isSubmissionsFetching;
  isProtocolFetching = this.submissionService.isProtocolFetching;
  isSourceFetching = this.submissionService.isSourceFetching;

  getDate = getDate;

  activeTab = 'submission_code';

  createTabs(protocol?: RunProtocol) {
    if (protocol) {
      return [
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
    }

    return [
      {
        text: 'Код посылки',
        id: 'submission_code',
        current: true,
      },
    ];
  }

  onTabClick(event: string) {
    this.activeTab = event;
  }
}
